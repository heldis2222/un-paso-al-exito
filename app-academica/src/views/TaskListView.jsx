import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const TaskListView = () => {
  const { setCurrentView, reminders, filter, setFilter, markAsCompleted, openModal } = useContext(AppContext);

  const filteredReminders = reminders.filter((r) => {
    if (filter === 'Pendientes') return r.estado === 'Pendiente';
    if (filter === 'Cumplidas') return r.estado === 'Cumplida';
    return true;
  });

  const handleShowDetails = (item) => {
    openModal(
      `📌 ${item.materia}`,
      `Tipo: ${item.tipo}\nDescripción: ${item.descripcion}\nFecha Límite: ${item.fecha.replace('T', ' ')}\nEstado: ${item.estado}`,
      item.estado === 'Pendiente' ? '✅ Marcar Cumplida' : 'Entendido',
      item.estado === 'Pendiente' ? () => markAsCompleted(item.id) : null
    );
  };

  return (
    <div className="screen-fade">
      <div className="card-panel">
        <div className="header-bar">
          <button className="btn-back" onClick={() => setCurrentView('dashboard')}>⬅ Volver</button>
          <h2>📋 Mis Recordatorios</h2>
        </div>

        <div className="filters-bar">
          {['Todas', 'Pendientes', 'Cumplidas'].map((tab) => (
            <button
              key={tab}
              className={`capsule-tab ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredReminders.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            No hay tareas en esta categoría. ¡Agrega una nueva!
          </p>
        ) : (
          filteredReminders.map((r) => (
            <div key={r.id} className="reminder-item">
              <div>
                <h4>[{r.tipo}] {r.materia}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {r.descripcion} - <strong>{r.fecha.replace('T', ' ')}</strong>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className={`badge ${r.estado.toLowerCase()}`}>{r.estado}</span>
                <button className="btn-back" onClick={() => handleShowDetails(r)}>🔍 Detalles</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};