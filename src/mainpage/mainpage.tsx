import ProtectedRoute from "../login/protected-route/protected_route";
import PageWithNavbar from "./pageWithNavbar/page_with_navbar";

function MainPage() {
    return (
        <ProtectedRoute>
            <PageWithNavbar />
        </ProtectedRoute>
    );
}

export default MainPage