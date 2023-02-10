import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";
import { QuoteFields } from "./campos_cotizacion";

function checkQuoteEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_INSERT_QUOTE ||
        !process.env.REACT_APP_BACKEND_GET_QUOTES) {
        return false;
    }

    return true;
}

function createQuote(quote: QuoteFields) {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_QUOTE
    api_url += `${quote.nombre}/`
    api_url += `${quote.parte}/`
    api_url += `${quote.fabricante}/`
    api_url += `${quote.cant}/`
    api_url += `${quote.presentacion}/`
    api_url += `${quote.unidad}/`
    api_url += `${quote.planta}/`
    api_url += `${quote.area}/`

    return fetch(api_url);
}

function getQuotes() {
    if (!checkQuoteEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_QUOTES
    return fetch(api_url);
}

export { createQuote, getQuotes };

