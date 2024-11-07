
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/dist/css/adminlte.min.css';


// Importar Bootstrap JS y AdminLTE JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import 'admin-lte/dist/js/adminlte.min.js'
import '../public/dist/css/adminlte.min.css';
import AppRouter from './routes/routes'; 
import "../src/components/App.css";

function App() {
  return (
    <>
      <AppRouter /> 
    </>
  );
}

export default App;