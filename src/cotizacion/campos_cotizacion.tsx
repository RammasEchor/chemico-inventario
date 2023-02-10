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

export type { QuoteFields }
export { quoteFieldsName, quoteFieldsTableTitles, QuoteStatus, getQuoteStatusFromString }

