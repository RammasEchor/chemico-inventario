import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";

function checkProductEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_GET_PRODUCTS ||
        !process.env.REACT_APP_BACKEND_INSERT_PRODUCT ||
        !process.env.REACT_APP_BACKEND_DELETE_PRODUCT) {
        return false;
    }

    return true;
}

function getProducts() {
    if (!checkProductEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PRODUCTS
    return fetch(api_url);
}

function deleteProduct(productId: string | undefined) {
    if (!checkProductEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    if (productId === undefined) {
        return (failedPromise("The productd ID to delete is undefined"));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_DELETE_PRODUCT
    api_url += `${productId}/`
    return fetch(api_url);
}

export { getProducts, deleteProduct };

