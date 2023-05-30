import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayCotizacionesPendientes from "./display_cotizaciones_pendientes";

function CotizacionesPendientes() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCotizacionesPendientes />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CotizacionesPendientes;