import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayHistorialEntradas from "./display_historial_entradas";

function HistorialEntradas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayHistorialEntradas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default HistorialEntradas