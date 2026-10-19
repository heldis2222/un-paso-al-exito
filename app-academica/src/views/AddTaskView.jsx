import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const AddTaskView = () => {
  const { setCurrentView, addReminder, openModal } = useContext(AppContext);
  const [materia, setMateria] = useState('');
  const [tipo, setTipo] = useState('Tarea');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (materia && descripcion && fecha) {
      addReminder({ materia, tipo, descripcion, fecha });
      openModal('¡Evento Guardado!', 'Tu recordatorio fue guardado correctamente en Un Paso al Éxito.', 'Ver Lista', () => {
        setCurrentView('list');
      });
    }
  };

  return (
    <div className="screen-fade">
      <div className="card-panel">
        <div className="header-bar">
          <button className="btn-back" onClick={() => setCurrentView('dashboard')}>⬅ Volver</button>
          <h2>➕ Agregar Recordatorio</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Materia / Asignatura *</label>
            <input
              type="text"
              placeholder="Ej: Arquitectura de Software"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de Evento *</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="Tarea">Tarea</option>
              <option value="Examen">Examen</option>
              <option value="Proyecto">Proyecto</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <input
              type="text"
              placeholder="Ej: Avance de documentación técnica"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha y Hora Límite *</label>
            <input
              type="datetime-local"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
            💾 Guardar Evento
          </button>
        </form>
      </div>
    </div>
  );
};