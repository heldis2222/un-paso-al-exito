import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Sidebar = () => {
  const { currentView, setCurrentView, user, streak, audioVoice, reminders } = useContext(AppContext);

  const pendientesCount = reminders.filter(r => r.estado === 'Pendiente').length;

  return (
    <aside className="sidebar">
      <div>
        {/* LOGO DE LA MARCA */}
        <div className="sidebar-header">
          <div className="sidebar-logo">🚀</div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Un Paso al Éxito</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.nombre || 'Estudiante'}</p>
          </div>
        </div>

        {/* NAVEGACIÓN LATERAL */}
        <ul className="sidebar-menu">
          <li
            className={`sidebar-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            📊 Panel Principal
          </li>
          <li
            className={`sidebar-item ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            📋 Mis Recordatorios 
            {pendientesCount > 0 && (
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                {pendientesCount}
              </span>
            )}
          </li>
          <li
            className={`sidebar-item ${currentView === 'add' ? 'active' : ''}`}
            onClick={() => setCurrentView('add')}
          >
            ➕ Añadir Tarea
          </li>
          <li
            className={`sidebar-item ${currentView === 'pomodoro' ? 'active' : ''}`}
            onClick={() => setCurrentView('pomodoro')}
          >
            ⏱️ Temporizador Foco
          </li>
          <li
            className={`sidebar-item ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            📅 Calendario
          </li>
        </ul>
      </div>

      {/* WIDGETS DE AUDIO Y RACHA EN SIDEBAR */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>🔥 Racha</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>{streak} Días</span>
        </div>

        <button
          className="btn-ghost"
          style={{ width: '100%', textAlign: 'left', fontSize: '0.82rem', marginBottom: '0.4rem' }}
          onClick={() => audioVoice.speakMotivation('tus tareas', user?.nombre)}
        >
          🗣️ Voz Motivacional
        </button>

        <button
          className="btn-ghost"
          style={{ width: '100%', textAlign: 'left', fontSize: '0.82rem', color: audioVoice.isMusicPlaying ? 'green' : 'inherit' }}
          onClick={audioVoice.toggleAmbientMusic}
        >
          {audioVoice.isMusicPlaying ? '🔊 Música: Activa' : '🎵 Música Concentración'}
        </button>
      </div>
    </aside>
  );
};