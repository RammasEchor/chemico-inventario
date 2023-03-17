import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import { DisplayAprobacionesListas } from "./display_aprobaciones_listas";

function AprobacionesListas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayAprobacionesListas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default AprobacionesListas