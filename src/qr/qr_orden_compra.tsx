import ProtectedRoute from "../login/protected-route/protected_route"
import PageWithNavbar from "../mainpage/pageWithNavbar/page_with_navbar"
import DisplayQrOrdenCompra from "./display_qr_orden_compra"

function QrOrdenCompra() {
    return (
        <ProtectedRoute>
            <PageWithNavbar>
                <DisplayQrOrdenCompra />
            </PageWithNavbar>
        </ProtectedRoute>
    )
}

export default QrOrdenCompra