import ProtectedRoute from "../../login/protected-route/protected_route";
import NavBar from "../../mainpage/navbar/navbar";
import FormularioBajaUsuario from "./formulario_baja_usuario";

function BajaUsuario() {
    return (
        <ProtectedRoute>
            <NavBar />
            <FormularioBajaUsuario />
        </ProtectedRoute>
    );
}

export default BajaUsuario