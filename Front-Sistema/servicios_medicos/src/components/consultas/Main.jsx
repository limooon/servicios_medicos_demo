
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsultationsList from './ConsultationsList';
import MyCalendar from './Calendar';

const Main = () => {
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
    <main className="app-main">
      <div>
       
        
        {/* Contenido principal */}
        <div className="p-8">
          {/* Dashboard */}
          
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
    </main>
  );
};

export default Main;
