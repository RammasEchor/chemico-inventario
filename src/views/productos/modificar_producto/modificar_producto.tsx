import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioModificarProducto from "./formulario_modificar_producto";

function ModificarProducto() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioModificarProducto />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default ModificarProducto