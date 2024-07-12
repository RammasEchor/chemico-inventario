import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MasterQuoteFields, getMasterQuotes, sendOneDecline, uploadPDF, uploadSecurityFile } from "../../apis/api_cotizacion";
import GhostButton from "../../form_components/ghost_button";
import { Modal } from "../../form_components/modal";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { dateParser } from "../../utilities/date_parser";
import { QuoteDetail } from "../cotizacion_card";
import FullQuoteDetail from "./modal_full_info";

function DisplayCotizacionesPendientes() {
    const [quotes, setQuotes] = useState<MasterQuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>("");
    const [showDetail, setShowDetail] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [tituloDescModal, setTituloDescModal] = useState('Vacio');
    const [detailQuoteId, setDetailQuoteId] = useState<string>();
    const [bothFilesUploaded, setBothFilesUploaded] = useState(0);
    const [currentTotal, setCurrentTotal] = useState<string>("");
    const [currentSolicitante, setCurrentSolicitante] = useState("");
    const navigate = useNavigate();

    const { userRole, userKey } = useAuth();

    useEffect(() => {
        getMasterQuotes(userKey)
            .then(response => response.json())
            .then((data: MasterQuoteFields[]) => {
                setQuotes(data);
            });
    }, [bothFilesUploaded, userRole, userKey]);

    function startUpload(file: File, securityFile: File) {
        uploadPDF(file, detailQuoteId)
            .then(response => response.text())
            .then(data => {
                if (data) {
                    setBothFilesUploaded(bothFilesUploaded => bothFilesUploaded + 1);
                    setShowDetail(false);
                }
            })
            .catch(error => {
                console.log(error)
            })

        uploadSecurityFile(securityFile, detailQuoteId)
            .then(response => response.text())
            .then(data => {
                if (data) {
                    setBothFilesUploaded(bothFilesUploaded => bothFilesUploaded + 1);
                    setShowDetail(false);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    function startDecline(folio: string | undefined) {
        sendOneDecline(folio)
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data) {
                    navigate(0);
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <div className="box">
            <h4 className="title is-4">Cotizaciones Pendientes</h4>
            <Tabla cols={[
                'Folio',
                'Descripción',
                'Aprobador 1',
                'Aprobador 2',
                'Fecha Aprobación 1',
                'Fecha Aprobación 2',
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
                            <td className={redIfNull(quote.descripcion)}>
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
                            </td>
                            <td className={redIfNull(quote.aprobador1)}>
                                {quote.aprobador1 ? quote.aprobador1 : "Faltante"}
                            </td>
                            <td className={redIfNull(quote.aprobador2)}>
                                {quote.aprobador2 ? quote.aprobador2 : "Faltante"}
                            </td>
                            <td className={redIfNull(quote.fechaAprob1)}>
                                {quote.fechaAprob1 ? dateParser(quote.fechaAprob1) : "Faltante"}
                            </td>
                            <td className={redIfNull(quote.fechaAprob2)}>
                                {quote.fechaAprob2 ? dateParser(quote.fechaAprob2) : "Faltante"}
                            </td>
                            <td>
                                <div className="block">
                                    <button
                                        className={selectedQuoteId === quote.id ?
                                            "button is-info is-inverted mr-3" :
                                            "button is-info is-outlined mr-3"
                                        }
                                        onClick={() => {
                                            setShowDetail(true)
                                            setDetailQuoteId(quote.id)
                                        }}
                                    >Adjuntar PDF</button>
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
            <Modal key={detailQuoteId} showModal={showDetail} onClick={() => setShowDetail(false)}>
                <QuoteDetail
                    quoteId={detailQuoteId}
                    onClickX={() => {
                        setShowDetail(false);

                    }}
                    onClickAprobar={startUpload}
                />
            </Modal>
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

export default DisplayCotizacionesPendientes