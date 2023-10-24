import { APIStringArg } from "./api_func_args_types";

class PurchaseOrderItem {
    id = ""
    ordenCompra = ""
    producto = ""
    descripcion = ""
    cantidad = ""
    unidadMedida = ""
    costo = ""
    cantidadParcial = ""
    lote = ""
    fechaCad = ""
    fechaIngreso = ""
    noRemision = ""
    usuario = ""
    restante = ""
}

function getMasterPurchaseOrder(id: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_MASTER_PURCHASE_ORDER;
    api_url += `${id}`

    return fetch(api_url);
}

function getDetailPurchaseOrder(id: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_DETAIL_PURCHASE_ORDER;
    api_url += `${id}/`

    return fetch(api_url);
}

function setMasterPurchaseOrderItem(userKey: APIStringArg, item: PurchaseOrderItem) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_MODIFY_PURCHASE_ORDER_ITEM;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...item, "cveUsuario": userKey }, function (_, value) {
            if (value === null) {
                return "";
            }

            return value;
        })
    });
}

function getPurchaseOrderItemList() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_PURCHASE_ORDER_ITEM_LIST;

    return fetch(api_url);
}

function uploadPurchaseOrderFileToDatabase(file: File, userKey: APIStringArg) {
    const formData = new FormData();

    formData.append("archivo", file);
    formData.append("userKey", userKey as string);

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_PURCHASE_ORDER_TO_DATABASE;
    return fetch(api_url, {
        method: 'POST',
        body: formData
    });
}

function getPurchaseOrders() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PURCHASE_ORDERS;

    return fetch(api_url);
}

export {
    PurchaseOrderItem,
    getDetailPurchaseOrder,
    getMasterPurchaseOrder,
    getPurchaseOrderItemList,
    getPurchaseOrders,
    setMasterPurchaseOrderItem,
    uploadPurchaseOrderFileToDatabase
};

