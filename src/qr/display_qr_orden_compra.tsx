import { useEffect, useState } from "react";
import { DetailPO, MasterPO, getDetailPurchaseOrder, getMasterPurchaseOrder } from "../apis/api_orden_compra";
import { dateParser } from "../utilities/date_parser";

function DisplayQrOrdenCompra() {
    const urlParams = new URLSearchParams(window.location.search);
    let idString = urlParams.get('id');

    const [masterPO, setMasterPO] = useState(new MasterPO());
    const [detailPO, setDetailPO] = useState<DetailPO[]>([]);

    useEffect(() => {
        getMasterPurchaseOrder(idString)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setMasterPO(data)
            })
            .catch(error => console.log(error))

        getDetailPurchaseOrder(idString)
            .then(res => {
                return res.json()
            })
            .then((data: DetailPO[]) => {
                setDetailPO(data)
            })
            .catch(error => console.log(error))
    }, [idString])

    function separator() {
        return (
            <tr>
                <td>
                    <div></div>
                </td>
                <td>
                    <div></div>
                </td>
            </tr>
        )
    }

    function tableRow(fieldName: string, value: string) {
        return (
            <tr>
                <td className="has-text-right">
                    {fieldName}
                </td>
                <td>
                    {value}
                </td>
            </tr>
        )
    }

    function tableRowBlueField(fieldName: string, value: string | null) {
        return (
            <tr>
                <th className="has-text-right has-background-info-light has-text-link">
                    {fieldName}
                </th>
                <td>
                    {value}
                </td>
            </tr>
        )
    }

    function itemRows(items: DetailPO[]) {
        return (items.map(prod => {
            return (
                <>
                    {separator()}
                    {tableRow("NO", "?")}
                    {tableRow("CÓDIGO", prod.codigo)}
                    {tableRow("DESCRIPCIÓN", prod.descripcion)}
                    {tableRow("CANTIDAD", prod.cantidad)}
                    {tableRow("UNIDAD DE MEDIDA", "?")}
                    {tableRow("COSTO", prod.costo)}
                </>
            )
        }))
    }

    return (
        <div className="columns">
            <div className="column is-offset-one-quarter is-half box">
                <table className="table is-bordered is-striped is-fullwidth is-hoverable">
                    <tbody>
                        {tableRowBlueField("VENDOR PO", masterPO.odc)}
                        {tableRowBlueField("PLANTA", masterPO.planta)}
                        {tableRowBlueField("DIRECCIÓN", "?")}
                        {tableRowBlueField("MONEDA", masterPO.moneda)}
                        {tableRowBlueField("NO. REM", masterPO.remision)}
                        {tableRowBlueField("FECHA", dateParser(masterPO.fecha))}
                        {itemRows(detailPO)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DisplayQrOrdenCompra