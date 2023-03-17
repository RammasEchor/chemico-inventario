import { useEffect, useState } from "react";
import { getQuoteDetail } from "../apis/api_cotizacion";
import FileForm from "../form_components/file_form";
import Tabla from "../form_components/table";

interface CotizacionCardProps {
    quoteId?: string
    onClickX?: () => void
    onClickCancel?: () => void
    onClickAprobar: (file: File) => void
}

function QuoteDetail(props: CotizacionCardProps) {
    const [quotes, setQuotes] = useState<{
        id: string
        nombre: string,
        parte: string,
        fabricante: string,
        cant: string,
        presentacion: string,
        unidad: string,
        planta: string,
        area: string
    }[]>([]);
    const [file, setFile] = useState<File>(new File([], 'dummy'));


    useEffect(() => {
        getQuoteDetail(props.quoteId)
            .then(response => response.json())
            .then(data => {
                setQuotes(data)
            })
    }, [props.quoteId]);

    return (
        <div className="model-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Folio: {props.quoteId} </p>
                <button className="delete" aria-label="close" onClick={props.onClickX} />
            </header>
            <section className="modal-card-body">
                <Tabla cols={[
                    "Nombre",
                    "Parte",
                    "Fabricante",
                    "Cantidad",
                    "Presentación",
                    "Unidad de medida",
                    "Planta",
                    "Área"
                ]}>
                    {quotes.map(quote => {
                        return (
                            <tr id={quote.id}
                                key={quote.id}
                            >
                                <td key={quote?.nombre}>
                                    {quote?.nombre}
                                </td>
                                <td key={quote?.parte}>
                                    {quote?.parte}
                                </td>
                                <td key={quote?.fabricante}>
                                    {quote?.fabricante}
                                </td>
                                <td key={quote?.cant}>
                                    {quote?.cant}
                                </td>
                                <td key={quote?.presentacion}>
                                    {quote?.presentacion}
                                </td>
                                <td key={quote?.unidad}>
                                    {quote?.unidad}
                                </td>
                                <td key={quote?.planta}>
                                    {quote?.planta}
                                </td>
                                <td key={quote?.area}>
                                    {quote?.area}
                                </td>
                            </tr>
                        );
                    })}
                </Tabla>
                <FileForm onChange={setFile} />
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <button className="button is-success" onClick={() => props.onClickAprobar(file)}>Enviar</button>
                <button className="button" onClick={props.onClickX}>Cancelar</button>
            </footer>
        </div>
    );
}

export { QuoteDetail };

