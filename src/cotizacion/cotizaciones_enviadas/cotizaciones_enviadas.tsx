import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayCotizacionesEnviadas from "./display_cotizaciones_enviadas";

function CotizacionesEnviadas() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCotizacionesEnviadas />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CotizacionesEnviadas