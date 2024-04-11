import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import DisplaySolicitudesAprobadas from "./display_solicitudes_aprobadas";

function SolicitudesAprobadas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                < DisplaySolicitudesAprobadas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default SolicitudesAprobadas