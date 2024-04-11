import { pdf } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { saveAs } from 'file-saver';
import { useEffect, useState } from "react";
import { getFetch, root } from "../../../apis/api";
import { Material, Solicitud, getSalidasCerradas } from "../../../apis/api_material";
import GhostButton from "../../../form_components/ghost_button";
import { Modal } from "../../../form_components/modal";
import SignatureModalContent from "../../../form_components/signatureModalContent";
import Tabla from "../../../form_components/table";
import { useAuth } from "../../../login/auth-provider/auth_provider";
import { dateParser } from "../../../utilities/date_parser";
import ModalDetalleSalidas from "../modalDetalleSalidas";
import { ModalInfo } from "../solicitudes_pendientes/display_solicitudes_pendientes";
import Vale from "./vale";


function DisplaySolicitudesCerradas() {
    const { userKey } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [modalInfo, setModalInfo] = useState<ModalInfo>({} as ModalInfo);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showSignatureCanvas, setShowSignatureCanvas] = useState(false);
    const [currentId, setCurrentId] = useState("0");
    const [currentSolicitud, setCurrentSolicitud] = useState<Solicitud>(new Solicitud());
    const [downloadPdf, setDownloadPdf] = useState(false);

    const getSalidaDetailQuery = useQuery<Material[]>({
        queryKey: ["getSalidaDetailQuery", currentId],
        queryFn: async () => {
            let api_url = root + process.env.REACT_APP_BACKEND_GET_SALIDAS_DETAIL;
            api_url += `${currentId}/`
            return getFetch(api_url);
        },
        enabled: downloadPdf
    });

    if (getSalidaDetailQuery.isSuccess && downloadPdf) {
        pdf(<Vale
            solicitudMaster={currentSolicitud}
            solicitudDetalle={getSalidaDetailQuery.data}
        />).toBlob().then(data => {
            saveAs(data, `${currentId}.pdf`);
            setDownloadPdf(false);
        });
    }

    useEffect(() => {
        getSalidasCerradas(userKey)
            .then(res => res.json())
            .then(data => {
                setSolicitudes(data)
            })
    }, [userKey]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    return (
        <div className="box">
            <h4 className="title is-4">Solicitudes Cerradas</h4>
            <Tabla cols={[
                'Fecha de Aprobación',
                'Solicitante',
                'Total',
                'Acción'
            ]}>
                {solicitudes.map(solicitud =>
                    <tr
                        key={solicitud.id}
                    >
                        <td>
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
                        <td>
                            <button
                                className={"button is-info is-outlined"}
                                onClick={() => {
                                    setShowSignatureCanvas(true)
                                    setCurrentId(solicitud.id)
                                }}
                            >Firmar</button>
                            <button
                                className={"button is-success is-outlined ml-4"}
                                onClick={async () => {
                                    setCurrentId(solicitud.id);
                                    setDownloadPdf(true);
                                    setCurrentSolicitud(solicitud);
                                }}
                            >Imprimir vale</button>
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
            <Modal showModal={showSignatureCanvas} onClick={() => setShowSignatureCanvas(false)}>
                <SignatureModalContent key={currentId}
                    info={{ title: "Firma", id: currentId }}
                    onClickCancel={() => setShowSignatureCanvas(false)}
                />
            </Modal>
        </div >
    );
}

export default DisplaySolicitudesCerradas;