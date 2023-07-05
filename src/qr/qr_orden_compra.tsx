import Brand from "../navbar/brand/brand"
import DisplayQrOrdenCompra from "./display_qr_orden_compra"

function QrOrdenCompra() {
    return (
        <>
            <nav className="navbar">
                <Brand onClick={() => console.log('No redirection!')} />
            </nav>
            <DisplayQrOrdenCompra />
        </>
    )
}

export default QrOrdenCompra