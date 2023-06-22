import { APIStringArg } from "./api_func_args_types";

interface SecuritySheet {
    id: string,
    descripcion: string,
    solicitante: string,
    aprobador1: string,
    aprobador2: string,
    fechaAprob1: string,
    total: string,
    orden: string,
    fechaEstimada: string,
    fechaAprob2: string
}

function getPendingSecuritySheets(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_SECURITY_SHEET
    api_url += `${userKey}/`

    return fetch(api_url);
}

function startApprovingSecuritySheet(folio: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_SET_SECURITY_SHEET
    api_url += `${folio}/`

    return fetch(api_url);
}

export {
    getPendingSecuritySheets,
    startApprovingSecuritySheet
};
export type { SecuritySheet };

