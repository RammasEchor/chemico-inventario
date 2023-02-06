import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioAltaProducto from "./formulario_alta_producto";

function AltaProducto() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioAltaProducto />
            </PageWithNavbar>
        </ProtectedRoute>
    )
}

export default AltaProducto