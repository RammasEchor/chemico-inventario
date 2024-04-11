import { useEffect, useState } from "react";
import { Solicitud, getSalidasRechazadas } from "../../../apis/api_material";
import GhostButton from "../../../form_components/ghost_button";
import { Modal } from "../../../form_components/modal";
import Tabla from "../../../form_components/table";
import { useAuth } from "../../../login/auth-provider/auth_provider";
import { dateParser } from "../../../utilities/date_parser";
import ModalDetalleSalidas from "../modalDetalleSalidas";

export interface ModalInfo {
    title: string
    id: string
};

function DisplaySolicitudesRechazadas() {
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [modalInfo, setModalInfo] = useState<ModalInfo>({} as ModalInfo);
    const { userKey } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
        {
            id: "Placeholder",
            aprobador: "Placeholder",
            estatus: "Placeholder",
            fecha_aprob: "Placeholder",
            solicitante: "Placeholder",
            total: "Placeholder",
            descripcion: "Placeholder",
            firma: "test"
        },
        {
            id: "Placeholder",
            aprobador: "Placeholder",
            estatus: "Placeholder",
            fecha_aprob: "Placeholder",
            solicitante: "Placeholder",
            total: "Placeholder",
            descripcion: "Placeholder",
            firma: "test"
        }
    ]);

    useEffect(() => {
        getSalidasRechazadas(userKey)
            .then(res => res.json())
            .then(data => setSolicitudes(data))
    }, [userKey]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    return (
        <div className="box">
            <h4 className="title is-4">Solicitudes Rechazadas</h4>
            <Tabla cols={[
                'Fecha de Rechazo',
                'Solicitante',
                'Total',
                'Descripcion'
            ]}>
                {solicitudes.map(solicitud =>
                    <tr
                        key={solicitud.id}
                    >
                        <td className={redIfNull(solicitud.fecha_aprob)}>
                            <GhostButton
                                onClick={() => {
                                    setModalInfo({
                                        title: dateParser(solicitud.fecha_aprob),
                                        id: solicitud.id
                                    })
                                    setShowDescriptionModal(true)
                                }}
                            >{solicitud.fecha_aprob ? dateParser(solicitud.fecha_aprob) : "Faltante"}</GhostButton>
                        </td>
                        <td className={redIfNull(solicitud.solicitante)}>
                            {solicitud.solicitante ? solicitud.solicitante : "Faltante"}
                        </td>
                        <td className={redIfNull(solicitud.total)}>
                            {solicitud.total ? solicitud.total : "Faltante"}
                        </td>
                        <td className={redIfNull(solicitud.descripcion)}>
                            {solicitud.descripcion ? solicitud.descripcion : "Faltante"}
                        </td>
                    </tr>
                )}
            </Tabla>
            <Modal showModal={showDescriptionModal} onClick={() => setShowDescriptionModal(false)}>
                <ModalDetalleSalidas key={modalInfo.id}
                    info={modalInfo}
                    onClickCancel={() => setShowDescriptionModal(false)}
                />
            </Modal>
        </div >
    )
}

export default DisplaySolicitudesRechazadas;