import FileForm from "../form_components/file_form";
import { QuoteFields } from "./campos_cotizacion";

interface CotizacionCardProps {
    detail?: QuoteFields
    onClickX?: () => void
    onClickCancel?: () => void
    onClickAprobar?: () => void
}

function QuoteDetail(props: CotizacionCardProps) {
    return (
        <div className="model-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Subir PDF</p>
                <button className="delete" aria-label="close" onClick={props.onClickX} />
            </header>
            <section className="modal-card-body">
                <FileForm />
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <button className="button is-success" onClick={props.onClickAprobar}>Enviar</button>
                <button className="button" onClick={props.onClickX}>Cancelar</button>
            </footer>
        </div>
    );
}

export { QuoteDetail };

