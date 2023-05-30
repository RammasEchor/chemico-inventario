import { failedPromise } from "../utilities/failed_promise";
import { APIStringArg } from "./api_func_args_types";

interface ProductFields {
    [index: string]: string,
    idProd: string,
    planta: string,
    noParte: string,
    descripcion: string,
    maximo: string,
    minimo: string,
    precio: string,
    uni_medida: string,
    fecha_exp: string,
    ubicacion: string
}

function insertProduct(product: ProductFields) {
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
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PRODUCTS
    return fetch(api_url);
}

function deleteProduct(productId: APIStringArg) {
    if (productId === undefined) {
        return (failedPromise("The productd ID to delete is undefined"));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_DELETE_PRODUCT
    api_url += `${productId}/`
    return fetch(api_url);
}

function modifyProduct(product: ProductFields) {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_MODIFY_PRODUCT

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });
}

export { insertProduct, getProducts, deleteProduct, modifyProduct };
export type { ProductFields };

