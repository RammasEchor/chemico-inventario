import 'react-datepicker/dist/react-datepicker.css';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AprobacionesHS from './cotizacion/aprobaciones_hs/aprobaciones_hs';
import CotizacionesAprobadas from "./cotizacion/aprobar_rechazar_cotizaciones/cotizaciones_aprobadas/cotizaciones_aprobadas";
import CotizationesPorAprobar from "./cotizacion/aprobar_rechazar_cotizaciones/cotizaciones_por_aprobar/cotizaciones_por_aprobar";
import CotizacionesEnviadas from "./cotizacion/cotizaciones_enviadas/cotizaciones_enviadas";
import CotizacionesRechazadas from "./cotizacion/cotizaciones_rechazadas/cotizaciones_rechazadas";
import CrearCotizacion from "./cotizacion/crear_cotizacion/crear_cotizacion";
import CotizacionesPendientes from "./cotizacion/pendientes_de_cotizar/cotizaciones_pendientes";
import CargarBaseDatos from './entradas/cargar_base_datos/cargar_base_datos';
import HistorialEntradas from './entradas/historial_entradas/historial_entradas';
import VerEntradas from './entradas/ver_entradas/ver_entradas';
import TestExcel from './form_components/test_excel';
import EntradaMaterial from "./inventario/entrada_material/entrada_producto";
import Existencias from './inventario/existencias/existencias';
import Inventario from "./inventario/inventario/inventario";
import Login from "./login/login";
import ResetPassword from "./login/reset_passwd";
import MainPage from "./mainpage/mainpage";
import QrOrdenCompra from './qr/qr_orden_compra';
import AltaUsuario from "./usuarios/alta_usuarios/alta_usuarios";
import BajaUsuario from "./usuarios/baja_usuarios/baja_usuarios";
import ModificarUsuario from "./usuarios/modificar_usuarios/modificar_usuarios";
import PresupuestoBU from './views/almacen/presupuestoBU';
import AltaProducto from "./views/productos/alta_producto/alta_producto";
import BajaProducto from "./views/productos/baja_producto/baja_producto";
import ModificarProducto from "./views/productos/modificar_producto/modificar_producto";
import ReporteCaducidad from './views/productos/reporte_caducidad/reporte_caducidad';
import SolicitudMaterial from './views/salidas/solicitud_material/solicitud_material';
import SolicitudesAprobadas from './views/salidas/solicitudes_aprobadas/solicitudes_aprobadas';
import SolicitudesCerradas from './views/salidas/solicitudes_cerradas/solicitudes_cerradas';
import SolicitudesPendientes from './views/salidas/solicitudes_pendientes/solicitudes_pendientes';
import SolicitudesRechazadas from './views/salidas/solicitudes_rechazadas/solicitudes_rechazadas';
import TestPdf from './views/testPDF/testPDF';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/change_passw" element={<ResetPassword />} />
      <Route path="/alta_usuario" element={<AltaUsuario />} />
      <Route path="/modificar_usuario" element={<ModificarUsuario />} />
      <Route path="/baja_usuario" element={<BajaUsuario />} />
      <Route path="/alta_producto" element={<AltaProducto />} />
      <Route path="/modificar_producto" element={<ModificarProducto />} />
      <Route path="/baja_producto" element={<BajaProducto />} />
      <Route path="/reporte_caducidad" element={<ReporteCaducidad />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/crear_cotizacion" element={<CrearCotizacion />} />
      <Route path="/cotizaciones_pendientes" element={<CotizacionesPendientes />} />
      <Route path="/cotizaciones_rechazadas" element={<CotizacionesRechazadas />} />
      <Route path="/cotizaciones_enviadas" element={<CotizacionesEnviadas />} />
      <Route path="/aprobaciones_hs" element={<AprobacionesHS />} />
      <Route path="/cotizaciones_por_aprobar" element={<CotizationesPorAprobar />} />
      <Route path="/cotizaciones_aprobadas" element={<CotizacionesAprobadas />} />
      <Route path="/entrada_material" element={<EntradaMaterial />} />
      <Route path="/historial_entradas" element={<HistorialEntradas />} />
      <Route path="/existencias" element={<Existencias />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/almacen" element={<PresupuestoBU />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/cotizaciones_avox" element={<MainPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/cargar_bd" element={<CargarBaseDatos />} />
      <Route path="/ver_entradas" element={<VerEntradas />} />
      <Route path="/solicitud_material" element={<SolicitudMaterial />} />
      <Route path="/solicitudes_pendientes" element={<SolicitudesPendientes />} />
      <Route path="/solicitudes_aprobadas" element={<SolicitudesAprobadas />} />
      <Route path="/solicitudes_cerradas" element={<SolicitudesCerradas />} />
      <Route path="/solicitudes_rechazadas" element={<SolicitudesRechazadas />} />
      <Route path="/qr_orden_compra" element={<QrOrdenCompra />} />
      <Route path="/test_excel" element={<TestExcel />} />
      <Route path="/test_pdf" element={<TestPdf />} />
    </Routes>
  );
}

export default App;
