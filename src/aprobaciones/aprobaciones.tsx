import ProtectedRoute from "../login/protected-route/protected_route";
import PageWithNavbar from "../mainpage/pageWithNavbar/page_with_navbar";
import { CotizacionesAprobadas } from "./cotizaciones_aprobadas";

function Aprobaciones() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <CotizacionesAprobadas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default Aprobaciones