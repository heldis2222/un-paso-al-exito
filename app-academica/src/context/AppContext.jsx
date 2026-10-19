import React, { createContext, useState, useEffect } from 'react';
import { useAudioVoice } from '../hooks/useAudioVoice';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado persistente
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('academic_user')) || null);
  const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem('academic_reminders')) || []);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('academic_streak')) || 1);
  
  // Estado de navegación SPA
  const [currentView, setCurrentView] = useState('login'); // login | dashboard | pomodoro | calendar | add | list
  const [filter, setFilter] = useState('Todas');

  // Estado del Modal Global
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    body: '',
    actionText: '¡Entendido!',
    onAction: null
  });

  const audioVoice = useAudioVoice();

  // Redirigir al dashboard si ya hay un usuario guardado
  useEffect(() => {
    if (user && currentView === 'login') {
      setCurrentView('dashboard');
    }
  }, [user]);

  // Guardar en LocalStorage al actualizar estados
  useEffect(() => {
    if (user) localStorage.setItem('academic_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('academic_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('academic_streak', streak.toString());
  }, [streak]);

  // 🔔 Motor de Alarmas en tiempo real (revisa cada segundo)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      setReminders((prevReminders) =>
        prevReminders.map((r) => {
          if (r.fecha === formattedNow && !r.notificado && r.estado === 'Pendiente') {
            audioVoice.playAlarmTone('animado');
            audioVoice.speakMotivation(r.materia, user?.nombre || 'Estudiante');
            openModal(
              '🔔 ALERTA DE RECORDATORIO ACADÉMICO',
              `¡Atención ${user?.nombre || ''}!\n\nMateria: ${r.materia}\nDetalle: ${r.descripcion}`,
              '¡A trabajar!'
            );
            return { ...r, notificado: true };
          }
          return r;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  // Funciones de gestión
  const loginUser = (nombre, dni) => {
    const newUser = { nombre, dni };
    setUser(newUser);
    setCurrentView('dashboard');
    audioVoice.speakText(`Bienvenido ${nombre} a tu asistente de estudio.`);
  };

  const addReminder = (reminder) => {
    setReminders((prev) => [...prev, { ...reminder, id: Date.now(), estado: 'Pendiente', notificado: false }]);
    audioVoice.speakText(`Recordatorio guardado para ${reminder.materia}`);
  };

  const markAsCompleted = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: 'Cumplida' } : r))
    );
    incrementStreak();
    audioVoice.speakText('¡Excelente trabajo cumpliendo tu tarea!');
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
  };

  const openModal = (title, body, actionText = '¡Entendido!', onAction = null) => {
    setModal({
      isOpen: true,
      title,
      body,
      actionText,
      onAction
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        reminders,
        streak,
        currentView,
        filter,
        modal,
        setCurrentView,
        setFilter,
        loginUser,
        addReminder,
        markAsCompleted,
        incrementStreak,
        openModal,
        closeModal,
        audioVoice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};