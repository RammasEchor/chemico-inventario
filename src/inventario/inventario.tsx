import ProtectedRoute from "../login/protected-route/protected_route";
import NavBar from "../mainpage/navbar/navbar";
import TablaInventario from "./tabla_inventario";

function Inventario() {
    return (
        <ProtectedRoute>
            <NavBar />
            <TablaInventario />
        </ProtectedRoute>
    );
}

export default Inventario