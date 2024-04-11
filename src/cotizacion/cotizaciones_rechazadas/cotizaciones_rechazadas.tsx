import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayCotizacionesRechazadas from "./display_cotizaciones_rechazadas";

function CotizacionesRechazadas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCotizacionesRechazadas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CotizacionesRechazadas;