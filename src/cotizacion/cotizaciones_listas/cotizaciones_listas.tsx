import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import { DisplayCotizacionesListas } from "./display_cotizaciones_listas";

function CotizacionesListas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCotizacionesListas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CotizacionesListas