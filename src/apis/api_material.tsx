import { APIStringArg } from "./api_func_args_types";

class Material {
    id = "";
    codigo = "";
    cantidad = "";
    precioU = "";
    precioT = "";
    numPedido = "";
    folio = "";
};

class Solicitud {
    id = "";
    aprobador = "";
    estatus = "";
    fecha_aprob = "";
    solicitante = "";
    total = "";
    descripcion = "";
}

function getNextSalida() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_NEXT_SALIDA;

    return fetch(api_url);
}

function getProductsSalida(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PRODUCTS_SALIDAS;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function getProductInfoSalida(codigo: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PRODUCT_INFO_SALIDAS;
    api_url += `${codigo}/`

    return fetch(api_url);
}

function postDetalleSalida(productos: Material[]) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_POST_PRODUCTS_SALIDAS;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productos)
    });
}

function postMasterDetalleSalida(folio: APIStringArg, userKey: APIStringArg, descripcion: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_POST_MASTER_PRODUCTS_SALIDAS;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'folio': folio,
            'solicitante': userKey,
            'descripcion': descripcion
        })
    });
}

function getSalidasPendientes(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_SALIDAS_PENDIENTES;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function postAprobarSalida(folio: APIStringArg, userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_POST_APROBAR_SALIDA;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'cve': userKey,
            'folio': folio
        })
    });
}

function getSalidasAprobadas(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_SALIDAS_APROBADAS;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function postCerrarSalida(folio: APIStringArg, userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_POST_CERRAR_SALIDA;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'cve': userKey,
            'folio': folio
        })
    });
}

function getSalidasCerradas(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_SALIDAS_CERRADAS;
    api_url += `${userKey}/`

    return fetch(api_url);
}

export {
    Material, Solicitud,
    getNextSalida, getProductInfoSalida, getProductsSalida, getSalidasAprobadas, getSalidasCerradas, getSalidasPendientes, postAprobarSalida, postCerrarSalida, postDetalleSalida, postMasterDetalleSalida
};

