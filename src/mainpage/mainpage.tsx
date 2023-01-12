import ProtectedRoute from "../login/protected-route/protected_route";
import NavBar from "./navbar/navbar";

function MainPage() {
    return (
        <ProtectedRoute>
            <NavBar />
        </ProtectedRoute>
    );
}

export default MainPage