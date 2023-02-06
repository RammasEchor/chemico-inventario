import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayCotizacion from "./display_cotizacion";

function EstatusCotization() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCotizacion />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default EstatusCotization;