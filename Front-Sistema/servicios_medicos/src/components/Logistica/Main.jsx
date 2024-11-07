
import { Link } from "react-router-dom";


const Main = () => {
  
  return (
    <main className="app-main">
      <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">Gestión Logística</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/logistica/events" className="bg-white shadow-md rounded-lg p-4 text-center hover:bg-blue-100">
                    <h2 className="text-xl font-bold">Eventos</h2>
                    <p className="text-gray-600">Gestiona tus eventos y actividades.</p>
                </Link>
                <Link to="/logistica/contacts" className="bg-white shadow-md rounded-lg p-4 text-center hover:bg-blue-100">
                    <h2 className="text-xl font-bold">Contactos</h2>
                    <p className="text-gray-600">Administra contactos y participantes.</p>
                </Link>
                <Link to="/logistica/files" className="bg-white shadow-md rounded-lg p-4 text-center hover:bg-blue-100">
                    <h2 className="text-xl font-bold">Archivos</h2>
                    <p className="text-gray-600">Sube y gestiona archivos importantes.</p>
                </Link>
                <Link to="/logistica/processes" className="bg-white shadow-md rounded-lg p-4 text-center hover:bg-blue-100">
                    <h2 className="text-xl font-bold">Procesos</h2>
                    <p className="text-gray-600">Controla los procesos asociados a eventos.</p>
                </Link>
            </div>
        </div>
    </main>
  );
};

export default Main;
