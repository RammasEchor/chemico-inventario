import { QuoteFields } from "../cotizacion/campos_cotizacion";
import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";

function checkQuoteEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_INSERT_QUOTE ||
        !process.env.REACT_APP_BACKEND_GET_PENDING_QUOTES ||
        !process.env.REACT_APP_BACKEND_GET_QUOTES) {
        return false;
    }

    return true;
}

function getNextQuote() {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;

    return fetch(api_url + process.env.REACT_APP_BACKEND_NEXT_QUOTE);
}

function getQuoteDetail(id: string | undefined) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTE_DETAIL;

    return fetch(api_url + id);
}

function createQuote(products: QuoteFields[], userKey: string | null, quoteId: string) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

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

function createMasterQuote(description: string, userKey: string | null) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_MASTER_QUOTE;
    api_url += `${description}/`
    api_url += `${userKey}/`

    return fetch(api_url);
}

function getQuotes(rol: string | null, cveUsuario: string | null) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PENDING_QUOTES
    api_url += `${rol}/`
    api_url += `${cveUsuario}/`
    return fetch(api_url);
}

function approveQuote(id: string | undefined) {
    if (!checkQuoteEnvironURLS() || !id) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_APPROVE_QUOTE;
    api_url += `${id}/`
    return fetch(api_url);
}

function uploadPDF(file: File, folio: string | undefined) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

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

function getMasterQuotes() {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_QUOTES;

    return fetch(api_url);
}

function getToApproves(userKey: string) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APPROVES;

    return fetch(api_url);
}

function insertToApprove(folio: string | undefined) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_APPROVE;
    api_url += `${folio}/`

    return fetch(api_url);
}

function getPendingApproves(userKey: string) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PENDING_APPROVES;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function sendOneApproves(userKey: string | undefined, folio: string | undefined) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_ONE_APPROV;
    api_url += `${userKey}/`
    api_url += `${folio}/`

    return fetch(api_url);
}

function getCotAprobadas(userKey: string | undefined) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APPROV_READY;
    api_url += `${userKey}/`

    return fetch(api_url);
}

function getInfoCot(id: string | undefined) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_QUOTE_FULL_DETAIL;
    api_url += `${id}/`

    return fetch(api_url);
}

function postContpaq({ comment, fecha, folio }: { comment: number, fecha: string, folio: string }) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

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

function sendOneDecline(folio: string | undefined) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

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

function getQuotesDeclined(userKey: string) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_QUOTES_DECLINED;
    api_url += `${userKey}/`

    return fetch(api_url);
}

export {
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
    getQuotesDeclined
};


