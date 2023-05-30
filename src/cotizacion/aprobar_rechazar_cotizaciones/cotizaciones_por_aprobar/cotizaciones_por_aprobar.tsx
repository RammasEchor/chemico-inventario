import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayCotizacionesPorAprobar from "./display_cot_por_aprobar";

function CotizationesPorAprobar() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCotizacionesPorAprobar />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CotizationesPorAprobar