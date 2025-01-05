import React, { useState, useEffect } from 'react';

function Calendar({ dateAndTime, setDateAndTime }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  };

  const getDaysInMonth = (date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay.getDate();
  };

  const renderCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);

    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (date) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
      setDateAndTime({
        ...dateAndTime,
        deadline_date: selectedDate.toISOString().split('T')[0], 
      });
    }
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div>
      <div>
        <button onClick={() => changeMonth(-1)}>{'<'}</button>
        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => changeMonth(1)}>{'>'}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} style={{ textAlign: 'center' }}>{day}</div>
        ))}
        {renderCalendar().map((day, index) => (
          <div
            key={index}
            style={{
              textAlign: 'center',
              padding: '10px',
              cursor: day ? 'pointer' : 'default',
              // backgroundColor: day === dateAndTime?.deadline_date?.getDate() ? 'lightblue' : 'transparent',
              backgroundColor: day === new Date(dateAndTime.deadline_date).getDate() ? 'lightblue' : 'transparent',

            }}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
