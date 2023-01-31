import { Route, Routes } from 'react-router-dom';
import './App.css';
import CrearCotizacion from './cotizacion/crear_cotizacion/crear_cotizacion';
import EstatusCotizacion from './cotizacion/estatus_cotización/estatus_cotizacion';
import Inventario from './inventario/inventario';
import Login from './login/login';
import MainPage from './mainpage/mainpage';
import AltaProducto from './productos/alta_producto/alta_producto';
import BajaProducto from './productos/baja_producto/baja_producto';
import AltaUsuario from './usuarios/alta_usuarios/alta_usuarios';
import BajaUsuario from './usuarios/baja_usuarios/baja_usuarios';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/alta_usuario' element={<AltaUsuario />} />
      <Route path='/baja_usuario' element={<BajaUsuario />} />
      <Route path='/alta_producto' element={<AltaProducto />} />
      <Route path='/baja_producto' element={<BajaProducto />} />
      <Route path='/crear_cotizacion' element={<CrearCotizacion />} />
      <Route path='/status_cotizacion' element={<EstatusCotizacion />} />
      <Route path='/inventario' element={<Inventario />} />
    </Routes>
  );
}

export default App;
