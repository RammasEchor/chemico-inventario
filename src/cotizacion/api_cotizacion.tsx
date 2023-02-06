import quoteFields from "./campos_cotizacion";

function createQuote(quote: quoteFields) {
    if (!process.env.REACT_APP_BACKEND_ROOT_URL ||
        !process.env.REACT_APP_BACKEND_QUOTE) {
        return (Promise.reject(new Error(`Env variables are not defined:
        REACT_APP_BACKEND_ROOT_URL
        REACT_APP_BACKEND_QUOTE`)))
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL
    api_url += process.env.REACT_APP_BACKEND_QUOTE
    api_url += `${quote.productName}/`
    api_url += `${quote.partNumber}/`
    api_url += `${quote.maker}/`
    api_url += `${quote.howMany}/`
    api_url += `${quote.type}/`
    api_url += `${quote.metricUnit}/`
    api_url += `${quote.origin}/`
    api_url += `${quote.useArea}/`

    return fetch(api_url);
}

export { createQuote };

