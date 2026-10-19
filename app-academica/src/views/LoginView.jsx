import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const LoginView = () => {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const { loginUser } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && dni.trim()) {
      loginUser(nombre.trim(), dni.trim());
    }
  };

  return (
    <div className="screen-fade">
      <div className="card-panel" style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🚀</div>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-orange)', marginBottom: '0.2rem' }}>
          Un Paso al Éxito
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Tu Asistente de Tareas y Motivación Académica
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Nombre Completo *</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>DNI / Código de Estudiante *</label>
            <input
              type="text"
              placeholder="Ej: 71829384"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Comenzar a Estudiar ➔
          </button>
        </form>
      </div>
    </div>
  );
};