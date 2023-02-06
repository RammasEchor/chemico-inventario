import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioBajaUsuario from "./formulario_baja_usuario";

function BajaUsuario() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioBajaUsuario />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default BajaUsuario