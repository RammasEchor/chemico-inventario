import { QRCodeSVG } from 'qrcode.react';
import { useParams } from "react-router-dom";

function DisplayQrOrdenCompra() {
    const { id } = useParams();

    return (
        <div>
            <div>{id}</div>
            <QRCodeSVG value="https://reactjs.org/" />
        </div>
    )
}

export default DisplayQrOrdenCompra