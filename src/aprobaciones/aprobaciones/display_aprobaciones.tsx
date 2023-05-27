import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPendingApproves, sendOneApproves, sendOneDecline } from "../../apis/api_cotizacion";
import { MasterQuoteFields } from "../../cotizacion/campos_cotizacion";
import FullQuoteDetail from "../../cotizacion/cotizaciones_pendientes/modal_full_info";
import { Modal } from "../../form_components/modal";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";

function DisplayAprobaciones() {
    const [quotes, setQuotes] = useState<MasterQuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>();
    const [anyApproved, setAnyApproved] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [tituloDescModal, setTituloDescModal] = useState('Vacio');
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
            <h4 className="title is-4">Cotizaciones</h4>
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
                            onClick={() => setSelectedQuoteId(quote.id)}
                            className={(selectedQuoteId === quote.id ? 'is-selected' : '')}
                        >
                            <td key={quote.id} className={redIfNull(quote.id)}>
                                {quote.id ? quote.id : "Sin Descripción"}
                            </td>
                            <td key={quote.descripcion} className={redIfNull(quote.descripcion)}>
                                {quote.descripcion ?
                                    <button
                                        className='button is-ghost'
                                        onClick={() => {
                                            setSelectedQuoteId(quote.id)
                                            setTituloDescModal(quote.descripcion as string)
                                            setShowDescriptionModal(true)
                                        }}
                                    >
                                        {quote.descripcion}
                                    </button>
                                    :
                                    "Sin Descripción"
                                }
                            </td>
                            <td key={quote.aprobador1} className={redIfNull(quote.aprobador1)}>
                                {quote.aprobador1 ? quote.aprobador1 : "Faltante"}
                            </td>
                            <td key={quote.aprobador2} className={redIfNull(quote.aprobador2)}>
                                {quote.aprobador2 ? quote.aprobador2 : "Faltante"}
                            </td>
                            <td key={quote.fechaAprob1} className={redIfNull(quote.fechaAprob1)}>
                                {quote.fechaAprob1 ? quote.fechaAprob1 : "Faltante"}
                            </td>
                            <td key={quote.fechaAprob2} className={redIfNull(quote.fechaAprob2)}>
                                {quote.fechaAprob2 ? quote.fechaAprob2 : "Faltante"}
                            </td>
                            <td key={quote.id}>
                                <div className="is-flex is-flex-direction-column">
                                    <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/COT_${quote.id}`}>PDF</a>
                                    <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/HOJA_SEG_${quote.id}`}>Hoja de Seguridad</a>
                                </div>
                            </td>
                            <td key={quote.id}>
                                <div className="block">
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
                    onClickCancelar={() => setShowDescriptionModal(false)}
                    show={showDescriptionModal}
                />
            </Modal>
        </div >
    );
}

export { DisplayAprobaciones };

