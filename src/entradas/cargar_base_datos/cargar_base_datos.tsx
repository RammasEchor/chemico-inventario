import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayCargarBaseDatos from "./display_carga_base_datos";

function CargarBaseDatos() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayCargarBaseDatos />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default CargarBaseDatos