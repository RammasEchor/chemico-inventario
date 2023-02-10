import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";
import { ProductFields } from "./campos_producto";

function checkProductEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_GET_PRODUCTS ||
        !process.env.REACT_APP_BACKEND_INSERT_PRODUCT ||
        !process.env.REACT_APP_BACKEND_DELETE_PRODUCT) {
        return false;
    }

    return true;
}

function insertProduct(product: ProductFields) {
    if (!checkProductEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_PRODUCT

    api_url += `${product.planta}/`
    api_url += `${product.noParte}/`
    api_url += `${product.descripcion}/`
    api_url += `${product.maximo}/`
    api_url += `${product.minimo}/`
    api_url += `${product.precio}/`
    api_url += `${product.uni_medida}/`
    api_url += `${product.fecha_exp}/`
    api_url += `${product.ubicacion}/`

    return fetch(api_url);
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

export { insertProduct, getProducts, deleteProduct };

