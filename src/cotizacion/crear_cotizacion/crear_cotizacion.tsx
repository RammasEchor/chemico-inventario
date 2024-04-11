import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import FormularioCotizacion from "./formulario_cotizacion";

function CrearCotizacion() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <FormularioCotizacion />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CrearCotizacion