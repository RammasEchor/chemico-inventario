import { useEffect, useState } from "react";
import { Material, getSalidasDetail } from "../../apis/api_material";
import Tabla from "../../form_components/table";
import { ModalInfo } from "./solicitudes_pendientes/display_solicitudes_pendientes";

interface DetalleSalidasProps {
    onClickCancel?: () => void
    info: ModalInfo
}

function ModalDetalleSalidas(props: DetalleSalidasProps) {
    const [materiales, setMateriales] = useState<Material[]>([]);

    useEffect(() => {
        getSalidasDetail(props.info.id)
            .then(res => res.json())
            .then(data => {
                setMateriales(data);
            });
    }, [props.info.id])

    return (
        <div className="modal-card ">
            <header className="modal-card-head">
                <p className="modal-card-title">{props.info.title} </p>
                <button className="delete" aria-label="close" onClick={props.onClickCancel} />
            </header>
            <section className="modal-card-body">
                <Tabla cols={[
                    'Folio',
                    'Código',
                    'Descripción',
                    'Cantidad',
                    'Precio Unitario',
                    'Precio Total'
                ]}>
                    {materiales.map(m => {
                        return (
                            <tr key={m.codigo}>
                                <td>{props.info.id}</td>
                                <td>{m.codigo}</td>
                                <td>{m.descripcion}</td>
                                <td>{m.cantidad}</td>
                                <td>{m.precioU}</td>
                                <td>{m.precioT}</td>
                               
                            </tr>
                        );
                    })}
                </Tabla>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
            </footer>
        </div>
    );
}

export default ModalDetalleSalidas;