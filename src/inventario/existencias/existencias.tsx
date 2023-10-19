import ProtectedRoute from "../../login/protected-route/protected_route";
import PageWithNavbar from "../../mainpage/pageWithNavbar/page_with_navbar";
import { DisplayExistencias } from "./display_existencias";

function Existencias() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayExistencias />
            </PageWithNavbar>
        </ProtectedRoute>
    );
}

export default Existencias;

