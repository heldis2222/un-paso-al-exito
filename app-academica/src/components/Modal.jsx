import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Modal = () => {
  const { modal, closeModal } = useContext(AppContext);

  if (!modal.isOpen) return null;

  const handleAction = () => {
    if (modal.onAction) modal.onAction();
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎓</div>
        <h3>{modal.title}</h3>
        <p style={{ margin: '1rem 0', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
          {modal.body}
        </p>
        <button className="btn-primary" style={{ width: '100%' }} onClick={handleAction}>
          {modal.actionText}
        </button>
      </div>
    </div>
  );
};