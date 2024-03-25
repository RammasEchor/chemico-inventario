import { useState } from "react"
import { PurchaseOrderItem, setMasterPurchaseOrderItem } from "../apis/api_orden_compra"
import { useAuth } from "../login/auth-provider/auth_provider"
import DatePickerField from "./datepicker"
import TextInputModifyModal from "./text_input_modify_modal"

function TableRowModifyValues({ item }: { item: PurchaseOrderItem }) {
    const [modifiedItem, setModifiedItem] = useState(item)
    const { userKey } = useAuth();
    const [buttonClassName, setButtonClassName] = useState("button is-info");
    const [buttonName, setButtonName] = useState("Ingresar");

    function updateItem(field: string, value: string) {
        setButtonClassName("button is-info");
        setButtonName("Ingresar");
        if (field === "cantidadParcial" &&
            parseInt(value) &&
            parseInt(item.cantidad) &&
            parseInt(value) > parseInt(item.cantidad)) {
            alert("Cantidad parcial no puede ser mayor a la Cantidad ordenada.");
        }

        setModifiedItem(modifiedItem => {
            return {
                ...modifiedItem,
                [field]: value
            }
        })
    }

    function startModifyingItem() {
        setButtonClassName("button is-info is-loading");
        if (parseInt(modifiedItem.cantidadParcial) > parseInt(modifiedItem.cantidad)) {
            return;
        }

        setMasterPurchaseOrderItem(userKey, modifiedItem)
            .then(res => {
                if (res.ok) {
                    setButtonClassName("button is-success");
                    setButtonName("Modificado");

                    res.text().then(data => alert(data))
                }

                else
                    res.text().then(log => alert(log))
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
                    initialvalue={item.cantidadParcial}
                    fieldname="cantidadParcial"
                    setcurrentvalue={updateItem}
                    max={item.cantidad} />
            </td>
            <td>
                <TextInputModifyModal
                    initialvalue={item.lote}
                    fieldname="lote"
                    setcurrentvalue={updateItem} />
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
                    initialvalue={item.noRemision}
                    fieldname="noRemision"
                    setcurrentvalue={updateItem} />
            </td>
            <td>
                <button
                    disabled={parseInt(modifiedItem.cantidadParcial) > parseInt(item.cantidad) ? true : false}
                    className={buttonClassName}
                    onClick={() => startModifyingItem()}
                >{buttonName}</button>
            </td>
        </>
    )
}

export default TableRowModifyValues