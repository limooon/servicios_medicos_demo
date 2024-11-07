import React, { useState } from "react";
import axios from "axios";

const AddConsultation = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    paciente_nombre: "",
    tipo_consulta: "",
    fecha_consulta: new Date().toISOString().slice(0, 16),
    motivo_consulta: "",
    recomendaciones: ""
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
      await axios.post("http://127.0.0.1:8000/servicios_medicos/api/consultas/", {
        ...formData,
        fecha_consulta: new Date(formData.fecha_consulta).toISOString()
      });
      alert("Consulta creada exitosamente.");
      onAdd(); // Llamada para actualizar la lista de consultas si es necesario
    } catch (error) {
      console.error("Error al crear la consulta:", error);
      alert("Error al crear la consulta. Intenta de nuevo.");
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
        Add Consultation
      </button>
    </form>
  );
};

export default AddConsultation;

