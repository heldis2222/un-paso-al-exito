import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';

// Vistas
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { PomodoroView } from './views/PomodoroView';
import { CalendarView } from './views/CalendarView';
import { AddTaskView } from './views/AddTaskView';
import { TaskListView } from './views/TaskListView';

// Componentes
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';

function App() {
  const { currentView, user } = useContext(AppContext);

  // Si no ha iniciado sesión, muestra únicamente el Login centrado
  if (!user || currentView === 'login') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
        <LoginView />
        <Modal />
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'pomodoro':
        return <PomodoroView />;
      case 'calendar':
        return <CalendarView />;
      case 'add':
        return <AddTaskView />;
      case 'list':
        return <TaskListView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {renderView()}
      </main>
      <Modal />
    </div>
  );
}

export default App;