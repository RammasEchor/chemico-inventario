import ProtectedRoute from "../../../login/protected-route/protected_route";
import PageWithNavbar from "../../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioReporteCaducidad from "./reporte_caducidad_view";

function ReporteCaducidad() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioReporteCaducidad />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default ReporteCaducidad