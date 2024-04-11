import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import { FormularioEntradaMaterial } from "./formulario_entrada_producto";

function EntradaMaterial() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioEntradaMaterial />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default EntradaMaterial;

