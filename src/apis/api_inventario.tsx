import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env"
import { failedPromise } from "../utilities/failed_promise"

interface MaterialAPI {
    id?: string
    nombreProd?: string
    codigoProd?: string
    fechaEntrada?: string
    usuarioRecibio?: string
    cantidad?: string
    observaciones?: string
    planta?: string
}

function checkMaterialEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_GET_MATERIALS ||
        !process.env.REACT_APP_BACKEND_INSERT_MATERIAL) {
        return false;
    }

    return true;
}

function getMaterials()  {
    if(!checkMaterialEnvironURLS)   {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_MATERIALS
    
    return fetch(api_url);
}

function createMaterial(material: MaterialAPI)  {
    if(!checkMaterialEnvironURLS)   {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_MATERIAL
    api_url += `${material.nombreProd}/`
    api_url += `${material.codigoProd}/`
    api_url += `${material.cantidad}/`
    api_url += `${material.fechaEntrada}/`
    api_url += `${material.usuarioRecibio}/`
    api_url += `${material.planta}/`
    api_url += `${material.observaciones}/`

    return fetch(api_url);
}

export type { MaterialAPI }
export { createMaterial, getMaterials }

