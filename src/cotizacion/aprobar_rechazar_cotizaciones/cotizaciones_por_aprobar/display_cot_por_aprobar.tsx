import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MasterQuoteFields, getPendingApproves, sendOneApproves, sendOneDecline } from "../../../apis/api_cotizacion";
import GhostButton from "../../../form_components/ghost_button";
import { Modal } from "../../../form_components/modal";
import Tabla from "../../../form_components/table";
import { useAuth } from "../../../login/auth-provider/auth_provider";
import { dateParser } from "../../../utilities/date_parser";
import FullQuoteDetail from "../../pendientes_de_cotizar/modal_full_info";

function DisplayCotizacionesPorAprobar() {
    const [quotes, setQuotes] = useState<MasterQuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>("");
    const [anyApproved, setAnyApproved] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [tituloDescModal, setTituloDescModal] = useState('Vacio');
    const [currentTotal, setCurrentTotal] = useState<string>("");
    const [currentSolicitante, setCurrentSolicitante] = useState("");
    const { userKey } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        getPendingApproves(userKey as string)
            .then(response => response.json())
            .then((data: MasterQuoteFields[]) => {
                setQuotes(data);
            });
    }, [anyApproved, userKey]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    if (anyApproved) {
        navigate(0);
    }

    function startApproved(folio: string | undefined) {
        sendOneApproves(userKey as string, folio)
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data) {
                    setAnyApproved(true);
                }
            })
            .catch(error => alert(error))
    }

    function startDecline(folio: string | undefined) {
        sendOneDecline(folio)
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data) {
                    setAnyApproved(true);
                }
            })
            .catch(error => alert(error))
    }

    return (
        <div className="box">
            <h4 className="title is-4">Cotizaciones por Aprobar</h4>
            <Tabla cols={[
                'Folio',
                'Descripción',
                'Aprobador 1',
                'Aprobador 2',
                'Fecha Aprobación 1',
                'Fecha Aprobación 2',
                'Revisar',
                'Acción'
            ]}>
                {quotes.map(quote => {
                    return (
                        <tr id={quote.id}
                            key={quote.id}
                            onClick={() => setSelectedQuoteId(quote.id as string)}
                            className={selectedQuoteId === quote.id ? 'is-selected' : ''}
                        >
                            <td className={redIfNull(quote.id)}>
                                {quote.id ? quote.id : "Sin Descripción"}
                            </td>
                            <td style={{ width: "15%" }} className={redIfNull(quote.descripcion)}>
                                <div className="my-5">
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
                                            {quote.descripcion.substring(0, 53)}
                                        </GhostButton>
                                        :
                                        "Sin Descripción"
                                    }
                                </div>
                            </td>
                            <td className={redIfNull(quote.aprobador1)}>
                                <div className="my-5">{quote.aprobador1 ? quote.aprobador1 : "Faltante"}</div>
                            </td>
                            <td className={redIfNull(quote.aprobador2)}>
                                <div className="my-5">{quote.aprobador2 ? quote.aprobador2 : "Faltante"}</div>
                            </td>
                            <td className={redIfNull(quote.fechaAprob1)}>
                                <div className="my-5">{quote.fechaAprob1 ? dateParser(quote.fechaAprob1) : "Faltante"}</div>
                            </td>
                            <td className={redIfNull(quote.fechaAprob2)}>
                                <div className="my-5">{quote.fechaAprob2 ? dateParser(quote.fechaAprob2) : "Faltante"}</div>
                            </td>
                            <td>
                                <div className="is-flex is-flex-direction-column my-4">
                                    <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/COT_${quote.id}`}>PDF</a>
                                    <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/HOJA_SEG_${quote.id}`}>Hoja de Seguridad</a>
                                </div>
                            </td>
                            <td>
                                <div className="block my-5">
                                    <button
                                        className={selectedQuoteId === quote.id ?
                                            "button is-success is-inverted mr-2 mb-2" :
                                            "button is-success is-outlined mr-2 mb-2"
                                        }
                                        onClick={() => {
                                            startApproved(quote.id)
                                        }}
                                    >Aprobar</button>
                                    <button
                                        className={selectedQuoteId === quote.id ?
                                            "button is-danger is-inverted" :
                                            "button is-danger is-outlined"
                                        }
                                        onClick={() => {
                                            startDecline(quote.id)
                                        }}
                                    >Rechazar</button>
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
                    total={currentTotal}
                    onClickCancelar={() => setShowDescriptionModal(false)}
                    solicitante={currentSolicitante}
                    show={showDescriptionModal}
                />
            </Modal>
        </div >
    );
}

export default DisplayCotizacionesPorAprobar;

