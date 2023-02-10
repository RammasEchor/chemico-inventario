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
                <p className="modal-card-title">Detalle de Cotización</p>
                <button className="delete" aria-label="close" onClick={props.onClickX} />
            </header>
            <section className="modal-card-body">
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <button className="button is-success" onClick={props.onClickAprobar}>Aprobar</button>
                <button className="button" onClick={props.onClickCancel}>Cancelar</button>
            </footer>
        </div>
    );
}

export { QuoteDetail };

