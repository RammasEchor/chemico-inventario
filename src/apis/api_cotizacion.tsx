import { APIStringArg } from "./api_func_args_types";

interface QuoteFields {
    id?: string,
    nombre: string,
    parte: string,
    fabricante: string,
    cant: string,
    presentacion: string,
    unidad: string,
    planta: string,
    area: string,
    additionalInfo?: string,
    status?: string
}

interface MasterQuoteFields {
    id?: string,
    descripcion?: string,
    aprobador1?: string,
    aprobador2?: string,
    fechaAprob1?: string,
    fechaAprob2?: string,
    fechaEstimada?: string,
    orden?: string,
    total?: string
}

enum QuoteStatus {
    Pendiente,
    Aprobada,
}

function getQuoteStatusFromString(rawString: string | undefined) {
    switch (rawString) {
        case "Aprobada": return QuoteStatus.Aprobada
        default: return QuoteStatus.Pendiente
    }
}

function getNextQuote() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_NEXT_QUOTE;

    return fetch(api_url);
}

function getQuoteDetail(id: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTE_DETAIL;

    return fetch(api_url + id);
}

function createQuote(products: QuoteFields[], userKey: APIStringArg, quoteId: APIStringArg) {
    let promiseArray: Promise<void>[] = [];
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    products.forEach(product => {
        let productUrl = api_url + process.env.REACT_APP_BACKEND_INSERT_QUOTE
        productUrl += `${product.nombre}/`
        productUrl += `${product.parte}/`
        productUrl += `${product.fabricante}/`
        productUrl += `${product.cant}/`
        productUrl += `${product.presentacion}/`
        productUrl += `${product.unidad}/`
        productUrl += `${product.planta}/`
        productUrl += `${product.area}/`
        productUrl += `${userKey}/`
        productUrl += `${quoteId}/`

        promiseArray.push(fetch(productUrl).then());
    });

    return Promise.all(promiseArray);
}

function createMasterQuote(description: APIStringArg, userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string
    api_url += process.env.REACT_APP_BACKEND_INSERT_MASTER_QUOTE;
    api_url += `${description}/`
    api_url += `${userKey}/`

    return fetch(api_url);
}

function getQuotes(rol: APIStringArg, cveUsuario: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PENDING_QUOTES
    api_url += `${rol}/`
    api_url += `${cveUsuario}/`
    return fetch(api_url);
}

function approveQuote(id: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_APPROVE_QUOTE;
    api_url += `${id}/`
    return fetch(api_url);
}

function uploadPDF(file: File, folio: APIStringArg) {
    const formData = new FormData();

    formData.append("archivos", file);
    formData.append("folio", folio as string);

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_PDF;
    return fetch(api_url, {
        method: 'POST',
        body: formData
    });
}

function uploadSecurityFile(file: File, folio: APIStringArg) {
    const formData = new FormData();

    formData.append("archivos", file);
    formData.append("folio", folio as string);

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_SECURITY_FILE;
    return fetch(api_url, {
        method: 'POST',
        body: formData
    });
}

function getMasterQuotes() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_QUOTES;

    return fetch(api_url);
}

function getToApproves() {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APPROVES;

    return fetch(api_url);
}

function insertToApprove(folio: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_APPROVE;
    api_url += `${folio}/`

    return fetch(api_url);
}

function getPendingApproves(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PENDING_APPROVES;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function sendOneApproves(userKey: APIStringArg, folio: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_ONE_APPROV;
    api_url += `${userKey}/`
    api_url += `${folio}/`

    return fetch(api_url);
}

function getCotAprobadas(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APPROV_READY;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function getInfoCot(id: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTE_FULL_DETAIL;
    api_url += `${id}/`

    return fetch(api_url);
}

function postContpaq({ comment, fecha, folio }: { comment: number, fecha: APIStringArg, folio: APIStringArg }) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTE_CONTPAQ;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'folio': folio,
            'orden': comment,
            'fecha': fecha
        })
    });
}

function sendOneDecline(folio: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTE_DECLINE;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'folio': folio
        })
    });
}

function getQuotesDeclined(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_QUOTES_DECLINED;
    api_url += `${userKey}/`

    return fetch(api_url);
}

export {
    getQuoteStatusFromString,
    createQuote,
    getQuotes,
    approveQuote,
    getNextQuote,
    createMasterQuote,
    uploadPDF,
    getMasterQuotes,
    getQuoteDetail,
    getToApproves,
    insertToApprove,
    getPendingApproves,
    sendOneApproves,
    getCotAprobadas,
    getInfoCot,
    postContpaq,
    sendOneDecline,
    getQuotesDeclined,
    uploadSecurityFile
};
export type { QuoteFields, MasterQuoteFields };

