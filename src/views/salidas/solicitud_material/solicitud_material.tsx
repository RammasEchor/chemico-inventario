import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioSolicitudMaterial from "./formulario_solicitud_material";

function SolicitudMaterial() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                < FormularioSolicitudMaterial />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default SolicitudMaterial