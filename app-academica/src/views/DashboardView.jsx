import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { WidgetBar } from '../components/WidgetBar';

export const DashboardView = () => {
  const { setCurrentView } = useContext(AppContext);

  return (
    <div className="screen-fade">
      <WidgetBar />

      <div className="dashboard-grid">
        <div className="dash-card" onClick={() => setCurrentView('pomodoro')}>
          <div className="icon">⏱️</div>
          <h3>Temporizador Foco</h3>
          <p>Método Pomodoro (25 min)</p>
        </div>

        <div className="dash-card" onClick={() => setCurrentView('calendar')}>
          <div className="icon">📅</div>
          <h3>Calendario</h3>
          <p>Vista de fechas clave</p>
        </div>

        <div className="dash-card" onClick={() => setCurrentView('add')}>
          <div className="icon">➕</div>
          <h3>Agregar Tarea</h3>
          <p>Exámenes y Pendientes</p>
        </div>

        <div className="dash-card" onClick={() => setCurrentView('list')}>
          <div className="icon">📋</div>
          <h3>Mis Recordatorios</h3>
          <p>Lista y Avance</p>
        </div>
      </div>
    </div>
  );
};