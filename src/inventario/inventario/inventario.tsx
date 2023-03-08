import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import DisplayInventario from "./display_inventario";

function Inventario() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayInventario />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default Inventario;