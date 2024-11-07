import { useEffect, useState } from 'react';
import axios from 'axios';

const HistorialMultas = () => {
  const [multas, setMultas] = useState([]);

  useEffect(() => {
    const fetchMultas = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/servicios_medicos/api/mis-multas/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMultas(response.data);
    };

    fetchMultas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-center my-6">Historial de Multas</h2>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 gap-4">
          {multas.length === 0 ? (
            <p className="text-center">No tienes multas registradas.</p>
          ) : (
            multas.map((multa) => (
              <div key={multa.id} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-bold">{multa.descripcion}</h3>
                <p>Monto: {multa.monto}</p>
                <p>Fecha: {new Date(multa.created_at).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialMultas;
