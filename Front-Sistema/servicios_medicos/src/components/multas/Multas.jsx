import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const Multas = () => {
  const navigate = useNavigate();
  const [multas, setMultas] = useState([]);
  const [filteredMultas, setFilteredMultas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const multasPerPage = 10;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchMultas = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/servicios_medicos/api/multas/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMultas(response.data);
        setFilteredMultas(response.data);
      } catch (error) {
        console.error('Error al obtener las multas:', error);
        navigate('/');
      }
    };

    fetchMultas();
  }, [navigate]);

  // Función para filtrar multas por término de búsqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = multas.filter((multa) =>
      multa.descripcion.toLowerCase().includes(value.toLowerCase()) ||
      multa.monto.toString().includes(value)
    );
    setFilteredMultas(filtered);
  };

  // Función para manejar la eliminación de una multa con confirmación
  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar la multa mediante una solicitud a tu API
        Swal.fire('¡Eliminado!', 'La multa ha sido eliminada.', 'success');
      }
    });
  };

  // Paginación
  const indexOfLastMulta = currentPage * multasPerPage;
  const indexOfFirstMulta = indexOfLastMulta - multasPerPage;
  const currentMultas = filteredMultas.slice(indexOfFirstMulta, indexOfLastMulta);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="p-4 bg-blue-500 text-white flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Multas</h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Opciones */}
      <div className="container mx-auto p-8">
        <h2 className="text-2xl mb-6 font-semibold">Opciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/multas')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Multas
          </button>
          <button
            onClick={() => navigate('/crear-multa')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Crear Multa
          </button>
          <button
            onClick={() => navigate('/historial-multas')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Historial de Multas
          </button>
        </div>

        {/* Búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por descripción o monto..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 w-full border rounded-lg"
          />
        </div>

        {/* Listado de Multas */}
        <h2 className="text-2xl mt-10 mb-6 font-semibold">Listado de Multas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-left">Monto</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentMultas.map((multa) => (
                <tr key={multa.id} className="border-b">
                  <td className="px-4 py-2">{multa.id}</td>
                  <td className="px-4 py-2">{multa.descripcion}</td>
                  <td className="px-4 py-2">${multa.monto}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Detalles
                    </button>
                    <button
                      onClick={() => handleDelete(multa.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-6">
          {[...Array(Math.ceil(filteredMultas.length / multasPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 border rounded-lg mx-1 ${
                currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Multas;
