import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioModificarUsuarios from "./formulario_modificar_usuarios";

function ModificarUsuario() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioModificarUsuarios />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default ModificarUsuario