import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const DashboardView = () => {
  const { setCurrentView, user, tasks = [] } = useContext(AppContext);

  // Imágenes reales de alta calidad (Unsplash)
  const heroImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80";
  const calendarImg = "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80";
  const tasksImg = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80";
  const pomodoroImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80";

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* 1. NAVBAR ESTILO MYSTUDYLIFE */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setCurrentView('dashboard')}>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0066ff', letterSpacing: '-0.5px' }}>
            Un Paso al Éxito
          </span>
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <span 
            onClick={() => setCurrentView('dashboard')} 
            style={{ fontWeight: '600', color: '#0066ff', cursor: 'pointer', borderBottom: '2px solid #0066ff', paddingBottom: '4px' }}
          >
            Home
          </span>
          <span 
            onClick={() => setCurrentView('calendar')} 
            style={{ fontWeight: '500', color: '#475569', cursor: 'pointer', transition: 'color 0.2s' }}
          >
            Calendario
          </span>
          <span 
            onClick={() => setCurrentView('list')} 
            style={{ fontWeight: '500', color: '#475569', cursor: 'pointer', transition: 'color 0.2s' }}
          >
            Mis Tareas
          </span>
          <span 
            onClick={() => setCurrentView('pomodoro')} 
            style={{ fontWeight: '500', color: '#475569', cursor: 'pointer', transition: 'color 0.2s' }}
          >
            Pomodoro
          </span>
        </div>

        {/* BOTÓN PRINCIPAL */}
        <button 
          onClick={() => setCurrentView('calendar')}
          style={{
            backgroundColor: '#0070f3',
            color: '#ffffff',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '30px',
            fontWeight: '700',
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 112, 243, 0.35)',
            transition: 'transform 0.2s, background-color 0.2s'
          }}
        >
          Abrir Web App
        </button>
      </nav>

      {/* 2. HERO SECTION ESTILO ELEGANTE OSCURO (MYSTUDYLIFE) */}
      <section style={{
        backgroundColor: '#0b132b',
        color: '#ffffff',
        padding: '60px 40px 80px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '40px',
        minHeight: '480px'
      }}>
        
        {/* TEXTO IZQUIERDA */}
        <div style={{ flex: '1 1 500px', maxWidth: '650px' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#ffffff',
            color: '#0b132b',
            padding: '6px 18px',
            borderRadius: '20px',
            fontWeight: '700',
            fontSize: '0.85rem',
            marginBottom: '24px',
            boxShadow: '0 2px 10px rgba(255,255,255,0.2)'
          }}>
            Bienvenido a Un Paso a tu Éxito
          </div>

          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: '800',
            lineHeight: '1.15',
            margin: '0 0 20px 0',
            letterSpacing: '-1px'
          }}>
            Infraestructura para un <span style={{ color: '#38bdf8' }}>aprendizaje organizado y sin estrés</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: '#94a3b8',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}>
            Hola, <strong style={{ color: '#ffffff' }}>{user?.name || 'Estudiante'}</strong>. Gestiona tus horarios, entregas de exámenes y sesiones de estudio enfocadas en una plataforma moderna creada para tu máximo rendimiento académico.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setCurrentView('calendar')}
              style={{
                backgroundColor: '#38bdf8',
                color: '#0b132b',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontWeight: '800',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              📅 Ver Calendario
            </button>

            <button 
              onClick={() => setCurrentView('add')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '14px 28px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              + Nueva Tarea / Examen
            </button>
          </div>
        </div>

        {/* IMAGEN Y TARJETA FLOTANTE DERECHA */}
        <div style={{ flex: '1 1 400px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          
          {/* Imagen Real Principal con Bordes Redondeados */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            height: '350px',
            borderRadius: '24px',
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            border: '4px solid rgba(255,255,255,0.1)'
          }} />

          {/* Tarjeta Flotante sobrepuesta */}
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            right: '20px',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            borderRadius: '16px',
            padding: '18px 24px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            maxWidth: '280px'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#0070f3',
              fontSize: '1.2rem'
            }}>
              ✓
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Estado de Entregas</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{tasks.length} Tareas Activas</div>
            </div>
          </div>

        </div>

      </section>

      {/* 3. SECCIÓN DE TARJETAS CON FOTOGRAFÍAS REALES */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '30px', color: '#0f172a' }}>
          Acceso Rápido a tus Módulos
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>

          {/* Módulo 1: Calendario */}
          <div 
            onClick={() => setCurrentView('calendar')}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            <div style={{ height: '160px', backgroundImage: `url(${calendarImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0070f3', textTransform: 'uppercase' }}>Vista Dinámica</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '8px 0' }}>Calendario de 12 Meses</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Organiza tus exámenes y proyectos en formato de semanas, meses o el año completo con paleta de colores.
              </p>
            </div>
          </div>

          {/* Módulo 2: Tareas */}
          <div 
            onClick={() => setCurrentView('list')}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            <div style={{ height: '160px', backgroundImage: `url(${tasksImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10b981', textTransform: 'uppercase' }}>Control Académico</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '8px 0' }}>Gestor de Tareas</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Mantén un registro detallado de todas tus asignaciones pendientes con fechas de vencimiento.
              </p>
            </div>
          </div>

          {/* Módulo 3: Pomodoro */}
          <div 
            onClick={() => setCurrentView('pomodoro')}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            <div style={{ height: '160px', backgroundImage: `url(${pomodoroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ef4444', textTransform: 'uppercase' }}>Enfoque Total</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '8px 0' }}>Temporizador Pomodoro</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Maximiza tu productividad estudiando en bloques de tiempo enfocados con descansos programados.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};