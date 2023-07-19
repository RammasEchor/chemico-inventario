import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPurchaseOrderItemList } from "../../apis/api_orden_compra";

function DisplayVerEntradas() {
    const [items, setItems] = useState<string[]>([])
    const [selectedItem, setSelectedItem] = useState<string>();

    useEffect(() => {
        getPurchaseOrderItemList()
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(error => console.log(error))
    }, [])

    const navigate = useNavigate();

    return (
        <div className="table-container">
            <table className="table is-hoverable is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th className="has-text-centered">No. Orden de Compra</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th className="has-text-centered">No. Orden de Compra</th>
                        <th>Acción</th>
                    </tr>
                </tfoot>
                <tbody>
                    {items.map(item =>
                        <tr
                            key={item}
                            className={selectedItem === item ? "is-selected" : ""}
                            onClick={() => setSelectedItem(item)}
                        >
                            <td className="has-text-centered">{item}</td>
                            <td><button
                                className="button is-info"
                                onClick={() => navigate(`/qr_orden_compra?id=${item}`)}
                            >Ver Detalle</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default DisplayVerEntradas