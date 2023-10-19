import { useEffect, useState } from "react";
import { PurchaseOrderItem, getPurchaseOrders } from "../../apis/api_orden_compra";
import Tabla from "../../form_components/table";
import { dateParser } from "../../utilities/date_parser";

function DisplayHistorialEntradas() {
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderItem[]>([]);

    useEffect(() => {
        getPurchaseOrders()
            .then(res => res.json())
            .then(data => {
                setPurchaseOrders(data)
            })
    }, []);

    return (
        <Tabla cols={[
            "No. Orden",
            "Producto",
            "Descripción",
            "Cantidad",
            "Cantidad Parcial",
            "Fecha de Ingreso",
            "Usuario",
            "Restante",
            "No. Remisión"
        ]}>
            {purchaseOrders.map(purchaseOrder =>
                <>
                    <tr key={purchaseOrder.id}>
                        <td>{purchaseOrder.ordenCompra}</td>
                        <td>{purchaseOrder.producto}</td>
                        <td>{purchaseOrder.descripcion}</td>
                        <td>{purchaseOrder.cantidad}</td>
                        <td>{purchaseOrder.cantidadParcial}</td>
                        <td>{dateParser(purchaseOrder.fechaIngreso)}</td>
                        <td>{purchaseOrder.usuario}</td>
                        <td>{purchaseOrder.restante}</td>
                        <td>{purchaseOrder.noRemision}</td>
                    </tr>
                </>
            )}
        </Tabla>
    )
}

export default DisplayHistorialEntradas