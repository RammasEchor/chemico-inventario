
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

function getMaterials()  {
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_MATERIALS
    
    return fetch(api_url);
}

function createMaterial(material: MaterialAPI)  {
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

