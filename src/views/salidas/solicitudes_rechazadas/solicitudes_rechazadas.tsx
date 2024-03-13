import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import DisplaySolicitudesRechazadas from "./display_solicitudes_rechazadas";

function SolicitudesRechazadas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                < DisplaySolicitudesRechazadas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default SolicitudesRechazadas