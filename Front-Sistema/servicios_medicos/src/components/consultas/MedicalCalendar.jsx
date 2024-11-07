import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const MedicalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Ejemplo de citas médicas (puedes cargarlas de una API o una base de datos)
  const medicalAppointments = [
    { date: '2024-10-15', time: '10:00 AM', patient: 'John Doe' },
    { date: '2024-10-16', time: '2:00 PM', patient: 'Jane Smith' },
    { date: '2024-10-18', time: '1:00 PM', patient: 'Carlos Martínez' },
  ];

  const onChange = (date) => {
    setSelectedDate(date);
  };

  const renderAppointments = () => {
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    const appointments = medicalAppointments.filter(
      (appointment) => appointment.date === formattedDate
    );

    return (
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <li key={index}>
              <strong>{appointment.time}</strong> - {appointment.patient}
            </li>
          ))
        ) : (
          <li>No hay citas para esta fecha</li>
        )}
      </ul>
    );
  };

  return (
    <div className="card-body w-full">
      <Calendar onChange={onChange} value={selectedDate} />
      <div className="appointments mt-3">
        <h5>Citas para {selectedDate.toDateString()}:</h5>
        {renderAppointments()}
      </div>
    </div>
  );
};

export default MedicalCalendar;
