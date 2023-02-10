interface ProductFields {
    idProd?: string,
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

const productFieldsName = [
    'Planta',
    'No. Parte',
    'Descripción',
    'Máximo',
    'Mínimo',
    'Precio unitario',
    'Unidad de medida',
    'Fecha de expiración',
    'Ubicación almacén'
]

export type { ProductFields }
export { productFieldsName }

