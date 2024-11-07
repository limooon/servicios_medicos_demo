import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearMulta = () => {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    try {
      await axios.post(
        'http://localhost:8000/servicios_medicos/api/multas/',
        {
          descripcion,
          monto,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/dashboard');
    } catch (error) {
      setError('Error creando la multa. Intente nuevamente.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Crear Multa</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label htmlFor="descripcion" className="block text-sm">Descripción</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="monto" className="block text-sm">Monto</label>
            <input
              type="number"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Crear Multa
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearMulta;
