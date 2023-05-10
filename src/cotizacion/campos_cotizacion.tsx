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

interface QuoteFields {
    id?: string,
    nombre: string,
    parte: string,
    fabricante: string,
    cant: string,
    presentacion: string,
    unidad: string,
    planta: string,
    area: string,
    additionalInfo?: string,
    status?: string
}

interface MasterQuoteFields {
    id?: string,
    descripcion?: string,
    aprobador1?: string,
    aprobador2?: string,
    fechaAprob1?: string,
    fechaAprob2?: string,
    fechaEstimada?: string,
    orden?: string
}

const quoteFieldsName = [
    'Nombre',
    'Parte',
    'Fabricante',
    'Cantidad',
    'Presentación',
    'Unidad',
    'Planta',
    'Área'
]

const quoteFieldsTableTitles = [
    'Nombre',
    'Parte',
    'Fabricante',
    'Cantidad',
    'Presentación',
    'Unidad',
    'Planta',
    'Área',
    'Status'
]

export type { QuoteFields, MasterQuoteFields }
export { quoteFieldsName, quoteFieldsTableTitles, QuoteStatus, getQuoteStatusFromString }

