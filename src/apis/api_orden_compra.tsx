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

function setMasterPurchaseOrderItem(id: APIStringArg, item: PurchaseOrderItem) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_MODIFY_PURCHASE_ORDER_ITEM;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    });
}

function getPurchaseOrderItemList() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_PURCHASE_ORDER_ITEM_LIST;

    return fetch(api_url);
}

function uploadPurchaseOrderFileToDatabase(file: File) {
    const formData = new FormData();

    formData.append("archivo", file);

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_PURCHASE_ORDER_TO_DATABASE;
    return fetch(api_url, {
        method: 'POST',
        body: formData
    });
}

export {
    PurchaseOrderItem,
    getDetailPurchaseOrder,
    getMasterPurchaseOrder,
    getPurchaseOrderItemList,
    setMasterPurchaseOrderItem,
    uploadPurchaseOrderFileToDatabase
};

