import ProtectedRoute from "../../login/protected-route/protected_route";
import NavBar from "../../mainpage/navbar/navbar";
import FormularioAltaProducto from "./formulario_alta_producto";

function AltaProducto() {
    return (
        <ProtectedRoute>
            <NavBar />
            <FormularioAltaProducto />
        </ProtectedRoute>
    )
}

export default AltaProducto