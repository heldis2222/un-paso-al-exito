import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';

// Vistas del proyecto
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { PomodoroView } from './views/PomodoroView';
import { CalendarView } from './views/CalendarView';
import { AddTaskView } from './views/AddTaskView';
import { TaskListView } from './views/TaskListView';

// Componentes
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';

export default function App() {
  const context = useContext(AppContext) || {};
  const currentView = context.currentView || 'dashboard';
  const user = context.user;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'pomodoro': return <PomodoroView />;
      case 'calendar': return <CalendarView />;
      case 'add': return <AddTaskView />;
      case 'list': return <TaskListView />;
      default: return <DashboardView />;
    }
  };

  return (
    <>
      {/* Inyección directa de estilos para garantizar que la app se vea impecable */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }
        body { background-color: #f8fafc; color: #1e293b; min-height: 100vh; }
        .app-container { display: flex; min-height: 100vh; width: 100vw; }
        .sidebar { width: 280px; background: #0f172a; color: #f8fafc; padding: 24px 16px; display: flex; flex-direction: column; gap: 24px; box-shadow: 4px 0 12px rgba(0,0,0,0.05); }
        .sidebar-header { padding-bottom: 16px; border-bottom: 1px solid #334155; }
        .brand-title { font-size: 1.25rem; font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 8px; }
        .user-name { font-size: 0.875rem; color: #94a3b8; margin-top: 6px; }
        .sidebar-menu { display: flex; flex-direction: column; gap: 8px; }
        .menu-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 16px; background: transparent; border: none; border-radius: 8px; color: #94a3b8; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: all 0.2s ease; text-align: left; }
        .menu-btn:hover { background: #1e293b; color: #f8fafc; }
        .menu-btn.active { background: #0284c7; color: #ffffff; font-weight: 600; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4); }
        .main-content { flex: 1; padding: 32px 40px; background: #f8fafc; overflow-y: auto; }
        .login-screen-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 20px; }
        /* Tarjetas e interfaz general */
        .card, div[class*="card"] { background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px; }
        h1, h2, h3 { color: #0f172a; margin-bottom: 12px; }
        button { cursor: pointer; }
      `}</style>

      {!user || currentView === 'login' ? (
        <div className="login-screen-wrapper">
          <LoginView />
          <Modal />
        </div>
      ) : (
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            {renderView()}
          </main>
          <Modal />
        </div>
      )}
    </>
  );
}