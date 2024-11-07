import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Events = () => {
    const { register, handleSubmit, reset } = useForm();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleAddEvent = async (data) => {
        try {
            setError(""); 
            setSuccessMessage(""); 

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("start_date", data.start_date);
            formData.append("end_date", data.end_date);
            formData.append("location", data.location);
            formData.append("invitados", data.invitados);
            formData.append("requerimientos", data.requerimientos);
            if (data.ficha_tecnica.length > 0) {
                formData.append("ficha_tecnica", data.ficha_tecnica[0]);
            }
            if (data.officios.length > 0) {
                formData.append("officios", data.officios[0]);
            }

            const response = await axios.post(
                "http://127.0.0.1:8000/servicios_medicos/api/events/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                setSuccessMessage("Evento agregado exitosamente.");
                fetchEvents(); // Actualizar la lista de eventos después de agregar uno nuevo
                reset(); // Resetear el formulario
            }
        } catch (error) {
            setError("Error al crear el evento: " + (error.response?.data?.message || error.message));
        }
    };

    // Función para eliminar un evento
    const handleDeleteEvent = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/servicios_medicos/api/events/${id}/`);
            if (response.status === 204) {
                setSuccessMessage("Evento eliminado exitosamente.");
                fetchEvents(); // Actualizar la lista de eventos después de eliminar uno
            }
        } catch (error) {
            setError("Error al eliminar el evento: " + (error.response?.data?.message || error.message));
        }
    };

    // Función para obtener la lista de eventos
    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/servicios_medicos/api/events/");
            setEvents(response.data);
        } catch (error) {
            console.error("Error al obtener los eventos:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Gestión de Eventos</h1>
            <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(handleAddEvent)} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Nombre del Evento</label>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Nombre del evento"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Descripción</label>
                        <textarea
                            {...register("description")}
                            placeholder="Descripción del evento"
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Fecha de Inicio</label>
                        <input
                            {...register("start_date")}
                            type="datetime-local"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Fecha de Fin</label>
                        <input
                            {...register("end_date")}
                            type="datetime-local"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Ubicación</label>
                        <input
                            {...register("location")}
                            type="text"
                            placeholder="Ubicación del evento"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Ficha Técnica</label>
                        <input
                            {...register("ficha_tecnica")}
                            type="file"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Officios</label>
                        <input
                            {...register("officios")}
                            type="file"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Agregar Evento
                    </button>
                </form>

                {error && <p className="text-red-500 mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
            </div>

            <ul className="space-y-4">
                {events.map((event) => (
                    <li key={event.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold">{event.name}</h2>
                        <p>{event.description}</p>
                        <p>Ubicación: {event.location}</p>
                        <p>Ficha Técnica: <a href={event.ficha_tecnica} target="_blank" rel="noopener noreferrer">{event.ficha_tecnica}</a></p>
                        <p>Officios: <a href={event.officios} target="_blank" rel="noopener noreferrer">{event.officios}</a></p>
                        <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-500 mt-2"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;

