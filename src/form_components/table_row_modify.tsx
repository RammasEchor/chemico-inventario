import { useState } from "react"
import { useNavigate } from "react-router"
import { PurchaseOrderItem, setMasterPurchaseOrderItem } from "../apis/api_orden_compra"
import { useAuth } from "../login/auth-provider/auth_provider"
import DatePickerField from "./datepicker"
import TextInputModifyModal from "./text_input_modify_modal"

function TableRowModifyValues({ item }: { item: PurchaseOrderItem }) {
    const [modifiedItem, setModifiedItem] = useState(item)
    const { userKey } = useAuth();

    function updateItem(field: string, value: string) {
        setModifiedItem(modifiedItem => {
            return {
                ...modifiedItem,
                [field]: value
            }
        })
    }

    const navigate = useNavigate();

    function startModifyingItem(item: PurchaseOrderItem) {
        setMasterPurchaseOrderItem(userKey, item)
            .then(res => {
                if (res.ok)
                    navigate(0);
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <td>{item.ordenCompra}</td>
            <td>{item.producto}</td>
            <td>{item.descripcion}</td>
            <td>{item.cantidad}</td>
            <td>{item.unidadMedida}</td>
            <td>{item.costo}</td>
            <td>
                <TextInputModifyModal
                    initialValue={item.cantidadParcial}
                    fieldName="cantidadParcial"
                    setCurrentValue={updateItem} />
            </td>
            <td>
                <TextInputModifyModal
                    initialValue={item.lote}
                    fieldName="lote"
                    setCurrentValue={updateItem} />
            </td>
            <td>
                <DatePickerField
                    selected={isNaN(Date.parse(modifiedItem.fechaCad)) ? null : new Date(modifiedItem.fechaCad)}
                    onChange={e => updateItem("fechaCad", e.toISOString())}
                />
            </td>
            <td>
                <DatePickerField
                    selected={isNaN(Date.parse(modifiedItem.fechaIngreso)) ? null : new Date(modifiedItem.fechaIngreso)}
                    onChange={e => updateItem("fechaIngreso", e.toISOString())}
                />
            </td>
            <td>
                <TextInputModifyModal
                    initialValue={item.noRemision}
                    fieldName="noRemision"
                    setCurrentValue={updateItem} />
            </td>
            <td>
                <button
                    className="button is-info"
                    onClick={() => startModifyingItem(modifiedItem)}
                >Ingresar</button>
            </td>
        </>
    )
}

export default TableRowModifyValues