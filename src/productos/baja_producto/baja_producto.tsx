import ProtectedRoute from "../../login/protected-route/protected_route";
import NavBar from "../../mainpage/navbar/navbar";
import FormularioBajaProducto from "./formulario_baja_producto";

function BajaProducto() {
    return (
        <ProtectedRoute>
            <NavBar />
            <FormularioBajaProducto />
        </ProtectedRoute>
    );
}

export default BajaProducto