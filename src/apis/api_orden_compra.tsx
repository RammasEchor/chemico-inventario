import { APIStringArg } from "./api_func_args_types";

class MasterPO {
    odc = ""
    planta = ""
    remision = ""
    moneda = ""
    fecha = ""
}

class DetailPO {
    id = ""
    codigo = ""
    descripcion = ""
    cantidad = ""
    costo = ""
    ordenCompra = ""
}

function getMasterPurchaseOrder(id: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_MASTER_PURCHASE_ORDER;
    api_url += `${id}/`

    return fetch(api_url);
}

function getDetailPurchaseOrder(id: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_DETAIL_PURCHASE_ORDER;
    api_url += `${id}/`

    return fetch(api_url);
}

export { DetailPO, MasterPO, getDetailPurchaseOrder, getMasterPurchaseOrder };

