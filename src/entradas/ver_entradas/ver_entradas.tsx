import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayVerEntradas from "./display_ver_entradas";

function VerEntradas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayVerEntradas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default VerEntradas