import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayAprobacionesHS from "./display_aprobaciones_hs";

function AprobacionesHS() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayAprobacionesHS />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default AprobacionesHS