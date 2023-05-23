import { Route, Routes } from 'react-router-dom';
import './App.css';
import Aprobaciones from './aprobaciones/aprobaciones/aprobaciones';
import AprobacionesListas from './aprobaciones/aprobaciones_listas/aprobaciones_listas';
import { CancelarCotizacion } from './cotizacion/cancelar_cotizacion/cancelar_cotizacion';
import CotizacionesListas from './cotizacion/cotizaciones_listas/cotizaciones_listas';
import CotizacionesPendientes from './cotizacion/cotizaciones_pendientes/cotizaciones_pendientes';
import CotizacionesRechazadas from './cotizacion/cotizaciones_rechazadas/cotizaciones_rechazadas';
import CrearCotizacion from './cotizacion/crear_cotizacion/crear_cotizacion';
import { EntradaProducto } from './inventario/entrada_material/entrada_producto';
import Inventario from './inventario/inventario/inventario';
import Login from './login/login';
import ResetPassword from './login/reset_passwd';
import MainPage from './mainpage/mainpage';
import AltaProducto from './productos/alta_producto/alta_producto';
import BajaProducto from './productos/baja_producto/baja_producto';
import ModificarProducto from './productos/modificar_producto/modificar_producto';
import AltaUsuario from './usuarios/alta_usuarios/alta_usuarios';
import BajaUsuario from './usuarios/baja_usuarios/baja_usuarios';
import ModificarUsuarios from './usuarios/modificar_usuarios/modificar_usuarios';

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
      <Route path='/status_cotizacion' element={<CotizacionesPendientes />} />
      <Route path='/cancelar_cotizacion' element={<CancelarCotizacion />} />
      <Route path='/entrada_material' element={<EntradaProducto />} />
      <Route path='/inventario' element={<Inventario />} />
      <Route path='/aprobaciones' element={<Aprobaciones />} />
      <Route path='/cotizaciones_listas' element={<CotizacionesListas />} />
      <Route path='/aprobaciones_listas' element={<AprobacionesListas />} />
      <Route path='/change_passw' element={<ResetPassword />} />
      <Route path='/cotizaciones_rechazadas' element={<CotizacionesRechazadas />} />
      <Route path='/modificar_usuario' element={<ModificarUsuarios />} />
      <Route path='/modificar_producto' element={<ModificarProducto />} />
    </Routes>
  );
}

export default App;
