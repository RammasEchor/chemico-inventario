import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import { DisplayAprobaciones } from "./display_aprobaciones";

function Aprobaciones() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayAprobaciones />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default Aprobaciones