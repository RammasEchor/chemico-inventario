import { useEffect, useState } from "react";
import { PurchaseOrderItem, getMasterPurchaseOrder } from "../apis/api_orden_compra";
import Tabla from "../form_components/table";
import TableRowModifyValues from "../form_components/table_row_modify";

function DisplayQrOrdenCompra() {
    const urlParams = new URLSearchParams(window.location.search);
    let idString = urlParams.get('id');

    const [purchaseOrderItems, setPurchaseOrderItems] = useState<PurchaseOrderItem[]>([
        {
            id: "",
            ordenCompra: "",
            producto: "",
            descripcion: "",
            cantidad: "",
            unidadMedida: "",
            costo: "",
            cantidadParcial: "",
            lote: "",
            fechaCad: "",
            fechaIngreso: "",
            noRemision: "",
            usuario: "",
            restante: ""
        }
    ]);

    useEffect(() => {
        getMasterPurchaseOrder(idString)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setPurchaseOrderItems(data)
            })
            .catch(error => console.log(error))
    }, [idString])



    function itemRows(items: PurchaseOrderItem[]) {
        return (items.map(item => {
            return (
                <tr key={item.id}>
                    <TableRowModifyValues item={item} />
                </tr>
            )
        }))
    }

    return (
        <Tabla cols={[
            "Orden de Compra",
            "Producto o Servicio",
            "Descripción",
            "Cantidad Ordenada",
            "Almacén",
            "Costo",
            "Cantidad Recibida",
            "Lote",
            "Fecha de Caducidad",
            "Fecha de Ingreso",
            "No. remisión",
            "Acción"
        ]}>
            {itemRows(purchaseOrderItems)}
        </Tabla>
    )
}

export default DisplayQrOrdenCompra