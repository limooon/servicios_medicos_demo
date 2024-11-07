import React, { useState } from "react";
import axios from "axios";

const EditConsultation = ({ consultation, onUpdate }) => {
  const [formData, setFormData] = useState({
    paciente_nombre: consultation.paciente_nombre || "",
    tipo_consulta: consultation.tipo_consulta || "",
    fecha_consulta: new Date(consultation.fecha_consulta).toISOString().slice(0, 16),
    motivo_consulta: consultation.motivo_consulta || "",
    recomendaciones: consultation.recomendaciones || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/servicios_medicos/api/consultas/${consultation.id}/`, {
        ...formData,
        fecha_consulta: new Date(formData.fecha_consulta).toISOString()
      });
      alert("Consulta actualizada exitosamente.");
      onUpdate(); // Llamada para actualizar la lista de consultas si es necesario
    } catch (error) {
      console.error("Error al actualizar la consulta:", error);
      alert("Error al actualizar la consulta. Intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="paciente_nombre"
        type="text"
        value={formData.paciente_nombre}
        onChange={handleChange}
        placeholder="Nombre del paciente"
        className="p-2 border border-gray-300 rounded-md w-full mb-2"
      />
      <input
        name="tipo_consulta"
        type="text"
        value={formData.tipo_consulta}
        onChange={handleChange}
        placeholder="Tipo de consulta"
        className="p-2 border border-gray-300 rounded-md w-full mb-2"
      />
      <input
        name="fecha_consulta"
        type="datetime-local"
        value={formData.fecha_consulta}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md w-full mb-2"
      />
      <textarea
        name="motivo_consulta"
        value={formData.motivo_consulta}
        onChange={handleChange}
        placeholder="Motivo de la consulta"
        className="p-2 border border-gray-300 rounded-md w-full mb-2"
      />
      <textarea
        name="recomendaciones"
        value={formData.recomendaciones}
        onChange={handleChange}
        placeholder="Recomendaciones"
        className="p-2 border border-gray-300 rounded-md w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Consultation
      </button>
    </form>
  );
};

export default EditConsultation;
