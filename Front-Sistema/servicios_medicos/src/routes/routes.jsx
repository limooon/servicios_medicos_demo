import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CrearMulta from '../components/multas/CrearMulta'; 
import PrivateRoute from './PrivateRoutes';
import Landing from '../pages/landing/Landing';
import DashboardMultas from '../components/multas/Dashboard_multas';
import DashboardMededico from '../components/consultas/DashboardMedico';
import DashboardLogistica from '../components/Logistica/DashboardLogistica';
import Processes from '../components/Logistica/Processes';
import Files from '../components/Logistica/Files';
import Contacts from '../components/Logistica/Contacts';
import Events from '../components/Logistica/Events';

export default function AppRouter() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Rutas multas */}
          <Route
            path="/multas"
            element={
              <PrivateRoute>
                <DashboardMultas/>
              </PrivateRoute>
            }
          />
          <Route
            path="/crear-multa"
            element={
              <PrivateRoute>
                <CrearMulta />
              </PrivateRoute>
            }
          />
          {/* Rutas consulta */}
          <Route
            path="/consulta"
            element={
              <PrivateRoute>
                <DashboardMededico/>
              </PrivateRoute>
            }
          />
          {/* Rutas logica */}
         {/* Dashboard principal protegido */}
         <Route 
                path="/logistica" 
                element={
                    <PrivateRoute>
                        <DashboardLogistica/>
                    </PrivateRoute>
                } 
            />

            {/* Subrutas protegidas */}
            <Route 
                path="/logistica/events" 
                element={
                    <PrivateRoute>
                        <Events/>
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/logistica/contacts" 
                element={
                    <PrivateRoute>
                        <Contacts/>
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/logistica/files" 
                element={
                    <PrivateRoute>
                        <Files/>
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/logistica/processes" 
                element={
                    <PrivateRoute>
                        <Processes/>
                    </PrivateRoute>
                } 
            />
        </Routes>
        
      </Router>
    );
  }