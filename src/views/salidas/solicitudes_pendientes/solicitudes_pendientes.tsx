import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import DisplaySolicitudesPendientes from "./display_solicitudes_pendientes";

function SolicitudesPendientes() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                < DisplaySolicitudesPendientes />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default SolicitudesPendientes