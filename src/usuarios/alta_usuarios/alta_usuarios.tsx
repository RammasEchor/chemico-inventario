import ProtectedRoute from "../../login/protected-route/protected_route";
import NavBar from "../../mainpage/navbar/navbar";
import FormularioAltaUsuario from "./formulario_alta_usuario";

function AltaUsuario() {
    return (
        <ProtectedRoute>
            <NavBar />
            <FormularioAltaUsuario />
        </ProtectedRoute>
    );
}

export default AltaUsuario