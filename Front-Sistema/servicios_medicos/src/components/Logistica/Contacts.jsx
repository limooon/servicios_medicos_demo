import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Contacts = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Función para agregar un nuevo contacto
    const handleAddContact = async (data) => {
        try {
            setError(""); // Limpiar errores anteriores
            setSuccessMessage(""); // Limpiar mensajes anteriores

            // Aquí está el console.log para depurar los datos que se están enviando
            console.log(data);

            const response = await axios.post(
                "http://127.0.0.1:8000/servicios_medicos/api/contacts/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setSuccessMessage("Contacto agregado exitosamente.");
                fetchContacts(); // Actualizar la lista de contactos después de agregar uno nuevo
                reset(); // Resetear el formulario
            }
        } catch (error) {
            setError("Error al crear el contacto: " + (error.response?.data?.message || error.message));
        }
    };

    // Función para eliminar un contacto
    const handleDeleteContact = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/servicios_medicos/api/contacts/${id}/`);
            if (response.status === 204) {
                setSuccessMessage("Contacto eliminado exitosamente.");
                fetchContacts(); // Actualizar la lista de contactos después de eliminar uno
            }
        } catch (error) {
            setError("Error al eliminar el contacto: " + (error.response?.data?.message || error.message));
        }
    };

    // Función para obtener la lista de contactos
    const fetchContacts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/servicios_medicos/api/contacts/");
            setContacts(response.data);
        } catch (error) {
            console.error("Error al obtener los contactos:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Gestión de Contactos</h1>
            <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(handleAddContact)} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Nombre</label>
                        <input
                            {...register("name", { required: "El nombre es obligatorio" })}
                            type="text"
                            placeholder="Nombre del contacto"
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Ingresa un correo válido"
                                }
                            })}
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full p-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Teléfono</label>
                        <input
                            {...register("phone", { required: "El teléfono es obligatorio" })}
                            type="text"
                            placeholder="Número de teléfono"
                            className="w-full p-2 border rounded"
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Dependencia</label>
                        <input
                            {...register("dependencia", { required: "La dependencia es obligatoria" })}
                            type="text"
                            placeholder="Dependencia"
                            className="w-full p-2 border rounded"
                        />
                        {errors.dependencia && <p className="text-red-500">{errors.dependencia.message}</p>}
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Cargo</label>
                        <input
                            {...register("cargo", { required: "El cargo es obligatorio" })}
                            type="text"
                            placeholder="Cargo del contacto"
                            className="w-full p-2 border rounded"
                        />
                        {errors.cargo && <p className="text-red-500">{errors.cargo.message}</p>}
                    </div>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Agregar Contacto
                    </button>
                </form>

                {error && <p className="text-red-500 mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
            </div>

            <ul className="space-y-4">
                {contacts.map((contact) => (
                    <li key={contact.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold">{contact.name}</h2>
                        <p>Email: {contact.email}</p>
                        <p>Teléfono: {contact.phone}</p>
                        <p>Dependencia: {contact.dependencia}</p>
                        <p>Cargo: {contact.cargo}</p>
                        <button
                            onClick={() => handleDeleteContact(contact.id)}
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

export default Contacts;
