import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const PomodoroView = () => {
  const { setCurrentView, incrementStreak, openModal, audioVoice } = useContext(AppContext);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 min
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      incrementStreak();
      audioVoice.speakText("¡Felicidades! Completaste tu sesión de foco en Un Paso al Éxito.");
      openModal("🎉 ¡Sesión Completada!", "¡Gran esfuerzo! Has sumado 1 día a tu Racha de Estudio 🔥");
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    audioVoice.speakText("Sesión de foco iniciada. Concentración total durante 25 minutos.");
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(1500);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="screen-fade">
      <div className="card-panel" style={{ textAlign: 'center' }}>
        <div className="header-bar">
          <button className="btn-back" onClick={() => setCurrentView('dashboard')}>⬅ Volver</button>
          <h2>⏱️ Temporizador Foco - Un Paso al Éxito</h2>
        </div>

        <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary-orange)', margin: '1.5rem 0' }}>
          {formatTime(timeLeft)}
        </div>

        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Céntrate en una sola tarea sin distracciones. ¡La voz motivacional y la música ambiental te acompañan!
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={handleStart} disabled={isActive}>
            ▶ Iniciar Foco
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            🔄 Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};