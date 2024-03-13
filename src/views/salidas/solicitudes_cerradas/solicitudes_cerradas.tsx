import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import DisplaySolicitudesCerradas from "./display_solicitudes_cerradas";

function SolicitudesCerradas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                < DisplaySolicitudesCerradas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default SolicitudesCerradas