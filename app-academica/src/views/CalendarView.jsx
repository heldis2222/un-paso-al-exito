import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export const CalendarView = () => {
  const { setCurrentView, tasks = [] } = useContext(AppContext);
  
  // Estado de fecha activa y de modo de vista: 'week' | 'month' | 'year'
  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); 

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Paleta de colores pastel para la vista de 12 meses (estilo tu imagen)
  const monthColors = [
    '#fde2e4', '#fad2e1', '#e2ece9', '#bee1e6', 
    '#f0efeb', '#dfe7fd', '#cdb4db', '#ffc8dd', 
    '#ffafcc', '#bde0fe', '#a2d2ff', '#e8dff5'
  ];

  const today = new Date();
  const daysHeader = ["L", "M", "M", "J", "V", "S", "D"];

  // Navegación de fechas
  const handlePrev = () => {
    if (viewMode === 'year') setViewDate(new Date(year - 1, 0, 1));
    else if (viewMode === 'month') setViewDate(new Date(year, month - 1, 1));
    else {
      const prevWeek = new Date(viewDate);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setViewDate(prevWeek);
    }
  };

  const handleNext = () => {
    if (viewMode === 'year') setViewDate(new Date(year + 1, 0, 1));
    else if (viewMode === 'month') setViewDate(new Date(year, month + 1, 1));
    else {
      const nextWeek = new Date(viewDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setViewDate(nextWeek);
    }
  };

  // Generador de mini cuadrícula de mes
  const renderMiniMonth = (monthIndex, cardBg) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    return (
      <div 
        key={months[monthIndex]} 
        style={{
          backgroundColor: cardBg,
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', textAlign: 'center', textTransform: 'uppercase', color: '#1e293b' }}>
          {months[monthIndex]}
        </h4>
        
        {/* Días de la semana */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>
          {daysHeader.map((d, i) => <div key={i}>{d}</div>)}
        </div>

        {/* Rejilla de días */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', fontSize: '0.75rem' }}>
          {Array.from({ length: offset }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = today.getFullYear() === year && today.getMonth() === monthIndex && today.getDate() === dayNum;
            return (
              <div 
                key={dayNum} 
                style={{ 
                  padding: '2px 0', 
                  borderRadius: '4px',
                  backgroundColor: isToday ? '#3b82f6' : 'transparent',
                  color: isToday ? '#fff' : '#334155',
                  fontWeight: isToday ? 'bold' : 'normal'
                }}
              >
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', width: '100%', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        
        {/* Barra superior de controles */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          
          <button 
            onClick={() => setCurrentView('dashboard')}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ⬅ Volver
          </button>

          {/* Navegación anterior / siguiente */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={handlePrev} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>◀</button>
            <h2 style={{ margin: 0, fontSize: '1.2rem', textAlign: 'center', minWidth: '180px' }}>
              {viewMode === 'year' ? `Año ${year}` : `${months[month]} ${year}`}
            </h2>
            <button onClick={handleNext} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>▶</button>
          </div>

          {/* Selector desplegable de modo de vista */}
          <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
            <button 
              onClick={() => setViewMode('week')}
              style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: viewMode === 'week' ? '#3b82f6' : 'transparent', color: viewMode === 'week' ? '#fff' : '#64748b', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Semana
            </button>
            <button 
              onClick={() => setViewMode('month')}
              style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: viewMode === 'month' ? '#3b82f6' : 'transparent', color: viewMode === 'month' ? '#fff' : '#64748b', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Mes
            </button>
            <button 
              onClick={() => setViewMode('year')}
              style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: viewMode === 'year' ? '#3b82f6' : 'transparent', color: viewMode === 'year' ? '#fff' : '#64748b', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Año (12 Meses)
            </button>
          </div>

        </div>

        {/* VISTA AÑO (12 Meses de colores como la imagen) */}
        {viewMode === 'year' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {months.map((_, index) => renderMiniMonth(index, monthColors[index % monthColors.length]))}
          </div>
        )}

        {/* VISTA MES */}
        {viewMode === 'month' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(d => (
              <div key={d} style={{ textAlign: 'center', fontWeight: 'bold', color: '#64748b', paddingBottom: '8px' }}>{d}</div>
            ))}
            {Array.from({ length: (new Date(year, month, 1).getDay() || 7) - 1 }).map((_, i) => (
              <div key={`emp-${i}`} style={{ background: '#f8fafc', borderRadius: '8px', minHeight: '80px' }} />
            ))}
            {Array.from({ length: new Date(year, month + 1, 0).getDate() }).map((_, i) => (
              <div key={i + 1} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px', minHeight: '80px', background: '#fff' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{i + 1}</span>
              </div>
            ))}
          </div>
        )}

        {/* VISTA SEMANA */}
        {viewMode === 'week' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d, i) => (
              <div key={d} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px', minHeight: '200px', background: '#fafafa' }}>
                <div style={{ fontWeight: 'bold', textAlign: 'center', color: '#3b82f6', marginBottom: '10px' }}>{d}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center' }}>Sin tareas fijadas</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};