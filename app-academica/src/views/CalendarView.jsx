import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const CalendarView = () => {
  const { setCurrentView } = useContext(AppContext);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const daysHeader = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="screen-fade">
      <div className="card-panel">
        <div className="header-bar">
          <button className="btn-back" onClick={() => setCurrentView('dashboard')}>⬅ Volver</button>
          <h2>📅 {months[month]} {year}</h2>
        </div>

        <div className="calendar-grid">
          {daysHeader.map((day) => (
            <div key={day} className="day-header">{day}</div>
          ))}

          {Array.from({ length: offset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: totalDays }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === now.getDate();
            return (
              <div key={dayNum} className={`calendar-day ${isToday ? 'today' : ''}`}>
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};