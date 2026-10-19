import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const WidgetBar = () => {
  const { user, streak, audioVoice } = useContext(AppContext);

  return (
    <div className="widget-bar">
      <div className="widget-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ fontSize: '2.2rem', background: 'var(--pastel-blue)', padding: '0.4rem', borderRadius: '50%' }}>
            👤
          </div>
          <div>
            <h3>¡Hola, {user?.nombre || 'Estudiante'}! 👋</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Un Paso al Éxito</p>
          </div>
        </div>
        <button
          className="btn-secondary"
          style={{ fontSize: '0.85rem', padding: '0.5rem 0.8rem' }}
          onClick={() => audioVoice.speakMotivation('tu jornada de estudio', user?.nombre)}
        >
          🗣️ Audio Motivador
        </button>
      </div>

      <div className="widget-box" style={{ background: '#FFF7ED', borderColor: '#FFEDD5' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C2410C' }}>
            RACHA DE ESTUDIO
          </span>
          <h2 style={{ color: 'var(--primary-orange)' }}>🔥 {streak} Días Activos</h2>
        </div>
        <button
          className="btn-primary"
          style={{ background: audioVoice.isMusicPlaying ? 'var(--accent-green)' : 'var(--primary-orange)' }}
          onClick={audioVoice.toggleAmbientMusic}
        >
          {audioVoice.isMusicPlaying ? '🔊 Música Foco: ON' : '🎵 Música Foco: OFF'}
        </button>
      </div>
    </div>
  );
};