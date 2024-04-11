import { useEffect, useState } from "react";
import { MasterQuoteFields, getCotAprobadas } from "../../../apis/api_cotizacion";
import { Role, getUserRoleFromString } from "../../../apis/api_usuarios";
import GhostButton from "../../../form_components/ghost_button";
import { Modal } from "../../../form_components/modal";
import Tabla from "../../../form_components/table";
import { useAuth } from "../../../login/auth-provider/auth_provider";
import { dateParser } from "../../../utilities/date_parser";
import FullQuoteDetail from "../../pendientes_de_cotizar/modal_full_info";
import ConpaqModal from "./updateConpaqModal";

function DisplayCotizacionesAprobadas() {
    const [quotes, setQuotes] = useState<MasterQuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>("");
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [tituloDescModal, setTituloDescModal] = useState('Vacio');
    const [showModalConpaq, setShowModalConpaq] = useState(false);
    const [currentTotal, setCurrentTotal] = useState<string>("");
    const [currentSolicitante, setCurrentSolicitante] = useState("");

    const { userKey, userRole } = useAuth();

    useEffect(() => {
        getCotAprobadas(userKey as string)
            .then(response => response.json())
            .then((data: MasterQuoteFields[]) => {
                setQuotes(data);
            });
    }, [userKey]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    return (
        <div className="box">
            <h4 className="title is-4">Cotizaciones Aprobadas</h4>
            <Tabla cols={[
                'Folio',
                'Descripción',
                'Aprobador 1',
                'Aprobador 2',
                'Fecha Aprobación 1',
                'Fecha Aprobación 2',
                'Fecha Estimada',
                'Orden',
                'Revisar',
            ]}>
                {quotes.map(quote => {
                    return (
                        <tr id={quote.id}
                            key={quote.id}
                            onClick={() => setSelectedQuoteId(quote.id as string)}
                            className={(selectedQuoteId === quote.id ? 'is-selected' : '')}
                        >
                            <td className={redIfNull(quote.id)}>
                                {quote.id ? quote.id : "Sin Descripción"}
                            </td>
                            <td style={{ width: "15%" }} className={redIfNull(quote.descripcion)}>
                                <div className="my-4">
                                    {quote.descripcion ?
                                        <GhostButton
                                            onClick={() => {
                                                setSelectedQuoteId(quote.id as string)
                                                setTituloDescModal(quote.descripcion as string)
                                                setCurrentTotal(quote.total as string)
                                                setCurrentSolicitante(quote.solicitante as string)
                                                setShowDescriptionModal(true)
                                            }}
                                        >
                                            {quote.descripcion}
                                        </GhostButton>
                                        :
                                        "Sin Descripción"
                                    }
                                </div>
                            </td>
                            <td className={redIfNull(quote.aprobador1)}>
                                <div className="my-5">
                                    {quote.aprobador1 ? quote.aprobador1 : "Faltante"}
                                </div>
                            </td>
                            <td className={redIfNull(quote.aprobador2)}>
                                <div className="my-5">
                                    {quote.aprobador2 ? quote.aprobador2 : "Faltante"}
                                </div>
                            </td>
                            <td className={redIfNull(quote.fechaAprob1)}>
                                <div className="my-5">
                                    {quote.fechaAprob1 ? dateParser(quote.fechaAprob1) : "Faltante"}
                                </div>
                            </td>
                            <td className={redIfNull(quote.fechaAprob2)}>
                                <div className="my-5">
                                    {quote.fechaAprob2 ? dateParser(quote.fechaAprob2) : "Faltante"}
                                </div>
                            </td>
                            <td className={redIfNull(quote.fechaEstimada)}>
                                <div className="my-5">
                                    {quote.fechaEstimada ? dateParser(quote.fechaEstimada) : "Faltante"}
                                </div>
                            </td>
                            <td className={redIfNull(quote.orden)}>
                                <div className="my-5">
                                    {quote.orden ? quote.orden : "Faltante"}
                                </div>
                            </td>
                            <td>
                                <div className="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
                                    <div className="is-flex is-flex-direction-column my-4">
                                        <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/COT_${quote.id}`}>PDF</a>
                                        <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/HOJA_SEG_${quote.id}`}>Hoja de Seguridad</a>
                                    </div>
                                    {quote.aprobador2 && quote.aprobador1 && getUserRoleFromString(userRole) !== Role.Cliente &&
                                        <button
                                            className={selectedQuoteId === quote.id ?
                                                "button is-success is-inverted" :
                                                "button is-success is-outlined"
                                            }
                                            onClick={() => {
                                                setSelectedQuoteId(quote.id as string)
                                                setShowModalConpaq(true)
                                            }}
                                        >{quote.fechaEstimada && quote.orden ? "Modificar" : "Procesada"}</button>
                                    }
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </Tabla>
            <Modal showModal={showDescriptionModal} onClick={() => setShowDescriptionModal(false)}>
                <FullQuoteDetail
                    cotId={selectedQuoteId}
                    titulo={tituloDescModal}
                    onClickCancelar={() => setShowDescriptionModal(false)}
                    solicitante={currentSolicitante}
                    show={showDescriptionModal}
                    total={currentTotal}
                />
            </Modal>
            <Modal key={selectedQuoteId} showModal={showModalConpaq} onClick={() => setShowModalConpaq(false)}>
                <ConpaqModal
                    folio={selectedQuoteId as string}
                    onClickCancelar={() => setShowModalConpaq(false)}
                />
            </Modal>
        </div >
    );
}

export { DisplayCotizacionesAprobadas };

