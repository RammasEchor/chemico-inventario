import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import { DisplayCotizacionesAprobadas } from "./display_cot_aprobadas";

function CotizacionesAprobadas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCotizacionesAprobadas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CotizacionesAprobadas