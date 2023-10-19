import { useEffect, useState } from "react";
import { getQuoteDetail } from "../apis/api_cotizacion";
import FileForm from "../form_components/file_form";
import Tabla from "../form_components/table";

interface CotizacionCardProps {
    quoteId?: string
    onClickX?: () => void
    onClickCancel?: () => void
    onClickAprobar: (file: File, file2: File) => void
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
    const [securityFile, setSecurityFile] = useState<File>(new File([], 'dummy'));
    const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
    const [numOfFilesToUpload, setNumOfFilesToUpload] = useState(0);
    const [fileIsSet, setFileIsSet] = useState(false);
    const [secFileIsSet, setSecFileIsSet] = useState(false);
    const [buttonString, setButtonString] = useState("Enviar 0/2 Archivos");

    useEffect(() => {
        getQuoteDetail(props.quoteId)
            .then(response => response.json())
            .then(data => {
                setQuotes(data)
            })
    }, [props.quoteId]);

    useEffect(() => {
        if (file.name !== 'dummy' && !fileIsSet) {
            setFileIsSet(true);
            setNumOfFilesToUpload(numOfFilesToUpload => numOfFilesToUpload + 1);
        }

        if (securityFile.name !== 'dummy' && !secFileIsSet) {
            setSecFileIsSet(true);
            setNumOfFilesToUpload(numOfFilesToUpload => numOfFilesToUpload + 1);
        }
    }, [file, securityFile, fileIsSet, secFileIsSet])

    useEffect(() => {
        setButtonString(`Enviar ${numOfFilesToUpload}/2 Archivos`);
        if(numOfFilesToUpload === 2) {
            setUploadButtonDisabled(false);
        }
    }, [numOfFilesToUpload])

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
                                <td>
                                    {quote?.nombre}
                                </td>
                                <td>
                                    {quote?.parte}
                                </td>
                                <td>
                                    {quote?.fabricante}
                                </td>
                                <td>
                                    {quote?.cant}
                                </td>
                                <td>
                                    {quote?.presentacion}
                                </td>
                                <td>
                                    {quote?.unidad}
                                </td>
                                <td>
                                    {quote?.planta}
                                </td>
                                <td>
                                    {quote?.area}
                                </td>
                            </tr>
                        );
                    })}
                </Tabla>
                <div className="box">
                    <label className="label">Adjuntar Cotización</label>
                    <FileForm onChange={setFile} />
                </div>
                <div className='box'>
                    <label className="label">Adjuntar Hoja de Seguridad</label>
                    <FileForm onChange={setSecurityFile} />
                </div>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <button className="button is-success" onClick={() => props.onClickAprobar(file, securityFile)} disabled={uploadButtonDisabled}>{buttonString}</button>
                <button className="button" onClick={props.onClickX}>Cancelar</button>
            </footer>
        </div>
    );
}

export { QuoteDetail };

