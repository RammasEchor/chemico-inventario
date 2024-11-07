import { useQuery } from "@tanstack/react-query";
import { getFetch, rootUrl } from "./api";
import { APIStringArg } from "./api_func_args_types";
import { Producto } from "./api_productos";

class ProductInQuote extends Producto {
    idProd = "";
    planta = "";
    noParte = "";
    descripcion = "";
    maximo = "";
    minimo = "";
    uni_medida = "";
    fecha_exp = "";
    ubicacion = "";
    precio = "";
    fabricante = "";
    cant = "";
    presentacion = "";
    area = "";
    datos_adicionales = "";
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
    solicitante?: string,
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

function createQuote(products: ProductInQuote[], quoteId: APIStringArg, userKey: APIStringArg) {
    let promiseArray: Promise<void>[] = [];
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    products.forEach(product => {
        let productUrl = api_url + process.env.REACT_APP_BACKEND_INSERT_QUOTE
        productUrl += `${product.descripcion}/`
        productUrl += `${product.noParte}/`
        productUrl += `${product.fabricante}/`
        productUrl += `${product.cant}/`
        productUrl += `${product.presentacion}/`
        productUrl += `${product.uni_medida}/`
        productUrl += `${product.planta}/`
        productUrl += `${product.area}/`
        productUrl += `${userKey}/`
        productUrl += `${quoteId}/`
        productUrl += `${product.avox}/`

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

function getMasterQuotes(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_QUOTES;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function getToApproves(userKey: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APPROVES;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function insertToApprove(folio: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_APPROVE;
    api_url += `${folio}/`

    console.log(api_url);
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

function postContpaq({ comment, fecha, folio }: { comment: APIStringArg, fecha: APIStringArg, folio: APIStringArg }) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTE_CONTPAQ;

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'folio': (folio?.toString()),
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

function updateCotTotal(total: APIStringArg, folio: APIStringArg) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTES_UPDATE_TOTAL

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'folio': folio,
            'total': total
        })
    });
}

function useProductsForAssignment(userKey: APIStringArg) {
    return useQuery<Producto[]>({
        queryKey: ["useProductsForAssignment"],
        queryFn: async () => {
            let url = rootUrl + process.env.REACT_APP_BACKEND_GET_PRODUCTS_SALIDAS;
            url += `${userKey}/`
            const data = await getFetch(url);

            return data
        }
    });
}

export {
    approveQuote, createMasterQuote, createQuote, getCotAprobadas,
    getInfoCot, getMasterQuotes, getNextQuote, getPendingApproves, getQuoteDetail, getQuotes, getQuotesDeclined, getQuoteStatusFromString, getToApproves,
    insertToApprove, postContpaq, ProductInQuote, sendOneApproves, sendOneDecline, updateCotTotal, uploadPDF, uploadSecurityFile, useProductsForAssignment
};
export type { MasterQuoteFields };

