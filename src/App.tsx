import { Route, Routes } from 'react-router-dom';
import './App.css';
import CrearCotizacion from './cotizacion/crear_cotizacion/crear_cotizacion';
import Inventario from './inventario/inventario';
import Login from './login/login';
import MainPage from './mainpage/mainpage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/inventario' element={<Inventario />} />
      <Route path='/crear_cotizacion' element={<CrearCotizacion />}/>
    </Routes>
  );
}

export default App;
