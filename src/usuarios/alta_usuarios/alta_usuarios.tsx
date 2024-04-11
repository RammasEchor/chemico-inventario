import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioAltaUsuario from "./formulario_alta_usuario";

function AltaUsuario() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioAltaUsuario />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default AltaUsuario