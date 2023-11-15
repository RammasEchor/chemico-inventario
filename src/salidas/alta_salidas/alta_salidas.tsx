import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioAltaSalida from "./formulario_alta_salidas";

function AltaSalida() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                < FormularioAltaSalida />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default AltaSalida