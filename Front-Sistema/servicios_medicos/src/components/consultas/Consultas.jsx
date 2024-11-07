import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Asegúrate de ajustar la ruta de importación si es necesario
import ConsultationsList from './ConsultationsList';
import MyCalendar from './Calendar';
import Dashboard from './DashboardMedico';

const Consultas = () => {
  // Ejemplo de datos simulados para las consultas y el calendario
  const [consultations, setConsultations] = useState([
    { patientName: "John Doe", date: "2024-10-16", time: "10:00 AM", status: "Pending" },
    { patientName: "Jane Doe", date: "2024-10-16", time: "11:00 AM", status: "Scheduled" },
  ]);

  const events = [
    { start: new Date(), end: new Date(), title: "Today's Appointment" },
  ];
  
  const navigate = useNavigate();
  const [multas, setMultas] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchMultas = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/servicios_medicos/api/multas/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMultas(response.data);
    };

    fetchMultas();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      {/* Contenido principal */}
      <div className="p-8">
        {/* Dashboard */}
        <Dashboard />

        {/* Lista de Consultas */}
        <div className="mt-8">
          <ConsultationsList consultations={consultations} />
        </div>

        {/* Calendario */}
        <div className="mt-8">
          <MyCalendar events={events} />
        </div>
      </div>
    </div>
  );
}

export default Consultas;
