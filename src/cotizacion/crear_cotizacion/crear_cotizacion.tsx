import ProtectedRoute from "../../login/protected-route/protected_route";
import NavBar from "../../mainpage/navbar/navbar";
import FormularioCotizacion from "./formulario_cotizacion";

function CrearCotizacion() {
    return (
        <ProtectedRoute>
            <NavBar/>
            <FormularioCotizacion/>
        </ProtectedRoute>
    );
}

export default CrearCotizacion