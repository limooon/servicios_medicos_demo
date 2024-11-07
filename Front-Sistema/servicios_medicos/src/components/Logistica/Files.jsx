// src/components/Files.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Files = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const response = await axios.get('/api/files/');
        setFiles(response.data);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        await axios.post('/api/files/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSelectedFile(null);
        fetchFiles();
    };

    const handleDeleteFile = async (id) => {
        await axios.delete(`/api/files/${id}/`);
        fetchFiles();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Archivos</h1>
            <div className="mb-4">
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="mb-2" />
                <button onClick={handleFileUpload} className="bg-blue-500 text-white p-2 rounded">Subir Archivo</button>
            </div>
            <ul className="space-y-4">
                {files.map((file) => (
                    <li key={file.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold">{file.name}</h2>
                        <button onClick={() => handleDeleteFile(file.id)} className="text-red-500 mt-2">Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Files;
