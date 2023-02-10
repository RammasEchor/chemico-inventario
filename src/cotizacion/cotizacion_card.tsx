import Tabla from "../form_components/table";
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
                <Tabla cols={["Propiedad", "Valor"]}>
                    <tr>
                        <td>Nombre</td>
                        <td>{props.detail?.nombre}</td>
                    </tr>
                    <tr>
                        <td>Parte</td>
                        <td>{props.detail?.parte}</td>
                    </tr>
                    <tr>
                        <td>Fabricante</td>
                        <td>{props.detail?.fabricante}</td>
                    </tr>
                    <tr>
                        <td>Cantidad</td>
                        <td>{props.detail?.cant}</td>
                    </tr>
                    <tr>
                        <td>Presentación</td>
                        <td>{props.detail?.presentacion}</td>
                    </tr>
                    <tr>
                        <td>Unidad</td>
                        <td>{props.detail?.unidad}</td>
                    </tr>
                    <tr>
                        <td>Planta</td>
                        <td>{props.detail?.planta}</td>
                    </tr>
                    <tr>
                        <td>Área</td>
                        <td>{props.detail?.area}</td>
                    </tr>
                </Tabla>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <button className="button is-success" onClick={props.onClickAprobar}>Aprobar</button>
                <button className="button" onClick={props.onClickX}>Cancelar</button>
            </footer>
        </div>
    );
}

export { QuoteDetail };

