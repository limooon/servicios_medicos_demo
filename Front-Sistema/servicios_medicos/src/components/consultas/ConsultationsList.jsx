import React, { useEffect, useState } from 'react';
import AddConsultation from './AddConsultation';
import EditConsultation from './EditConsultation';

const API_URL = 'http://127.0.0.1:8000/servicios_medicos/api/consultas/';

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingConsultation, setEditingConsultation] = useState(null);
  const [search, setSearch] = useState('');

  // Fetch consultations data
  const fetchConsultations = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      setConsultations(consultations.filter(consultation => consultation.id !== id));
    } catch (error) {
      console.error('Error deleting consultation:', error);
    }
  };

  // Handle search
  const filteredConsultations = consultations.filter((consultation) =>
    consultation.paciente_nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Consultations</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        placeholder="Search by patient name or date..."
      />
      <AddConsultation onAdd={fetchConsultations} />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">Patient Name</th>
            <th className="py-2 px-4 bg-gray-200">Consultation Type</th>
            <th className="py-2 px-4 bg-gray-200">Date</th>
            <th className="py-2 px-4 bg-gray-200">Reason</th>
            <th className="py-2 px-4 bg-gray-200">Recommendations</th>
            <th className="py-2 px-4 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsultations.map((consultation) => (
            <tr key={consultation.id} className="border-b">
              <td className="py-2 px-4">{consultation.paciente_nombre}</td>
              <td className="py-2 px-4">{consultation.tipo_consulta}</td>
              <td className="py-2 px-4">{new Date(consultation.fecha_consulta).toLocaleDateString()}</td>
              <td className="py-2 px-4">{consultation.motivo_consulta}</td>
              <td className="py-2 px-4">{consultation.recomendaciones}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditingConsultation(consultation);
                  }}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(consultation.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <EditConsultation
          consultation={editingConsultation}
          onUpdate={() => {
            fetchConsultations();
            setIsEditing(false);
            setEditingConsultation(null);
          }}
        />
      )}
    </div>
  );
};

export default ConsultationsList;
