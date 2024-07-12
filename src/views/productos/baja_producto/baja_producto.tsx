import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioBajaProducto from "./formulario_baja_producto";

function BajaProducto() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioBajaProducto />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default BajaProducto