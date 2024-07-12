import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import PresupuestoBUView from "./presupuestoBU_view";

function PresupuestoBU() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <PresupuestoBUView />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default PresupuestoBU;