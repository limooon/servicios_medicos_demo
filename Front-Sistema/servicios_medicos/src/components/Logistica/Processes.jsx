// src/components/Processes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Processes = () => {
    const [processes, setProcesses] = useState([]);
    const [newProcess, setNewProcess] = useState({ name: '', description: '', eventId: '' });

    useEffect(() => {
        fetchProcesses();
    }, []);

    const fetchProcesses = async () => {
        const response = await axios.get('/api/processes/');
        setProcesses(response.data);
    };

    const handleAddProcess = async () => {
        await axios.post('/api/processes/', newProcess);
        setNewProcess({ name: '', description: '', eventId: '' });
        fetchProcesses();
    };

    const handleDeleteProcess = async (id) => {
        await axios.delete(`/api/processes/${id}/`);
        fetchProcesses();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Procesos</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Nombre del proceso"
                    value={newProcess.name}
                    onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
                    className="p-2 border rounded mb-2"
                />
                {/* Otros campos para descripción y selección de evento */}
                <button onClick={handleAddProcess} className="bg-blue-500 text-white p-2 rounded">Agregar Proceso</button>
            </div>
            <ul className="space-y-4">
                {processes.map((process) => (
                    <li key={process.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold">{process.name}</h2>
                        <p>{process.description}</p>
                        <button onClick={() => handleDeleteProcess(process.id)} className="text-red-500 mt-2">Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Processes;
