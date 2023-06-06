import { useEffect, useState } from "react";
import { MasterQuoteFields, getCotAprobadas } from "../../../apis/api_cotizacion";
import { Modal } from "../../../form_components/modal";
import Tabla from "../../../form_components/table";
import { useAuth } from "../../../login/auth-provider/auth_provider";
import FullQuoteDetail from "../../pendientes_de_cotizar/modal_full_info";
import ConpaqModal from "./updateConpaqModal";

function DisplayCotizacionesAprobadas() {
    const [quotes, setQuotes] = useState<MasterQuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>("");
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [tituloDescModal, setTituloDescModal] = useState('Vacio');
    const [showModalConpaq, setShowModalConpaq] = useState(false);
    const [currentTotal, setCurrentTotal] = useState<string>("");

    const { userKey } = useAuth();

    useEffect(() => {
        getCotAprobadas(userKey as string)
            .then(response => response.json())
            .then((data: MasterQuoteFields[]) => {
                setQuotes(data);
            });
    }, [userKey, showModalConpaq]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
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
                'Fecha Estimada',
                'Orden',
                'Revisar',
            ]}>
                {quotes.map(quote => {
                    return (
                        <tr id={quote.id}
                            key={quote.id}
                            onClick={() => setSelectedQuoteId(quote.id as string)}
                            className={selectedQuoteId === quote.id ? 'is-selected' : ''}
                        >
                            <td key={quote.id} className={redIfNull(quote.id)}>
                                {quote.id ? quote.id : "Sin Descripción"}
                            </td>
                            <td key={quote.descripcion} className={redIfNull(quote.descripcion)}>
                                {quote.descripcion ?
                                    <button
                                        className='button is-ghost'
                                        onClick={() => {
                                            setSelectedQuoteId(quote.id as string)
                                            setTituloDescModal(quote.descripcion as string)
                                            setCurrentTotal(quote.total as string)
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
                            <td key={quote.fechaEstimada} className={redIfNull(quote.fechaEstimada)}>
                                {quote.fechaEstimada ? quote.fechaEstimada : "Faltante"}
                            </td>
                            <td key={quote.orden} className={redIfNull(quote.orden)}>
                                {quote.orden ? quote.orden : "Faltante"}
                            </td>
                            <td key={quote.id}>
                                <div className="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
                                    <div className="is-flex is-flex-direction-column">
                                        <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/COT_${quote.id}`}>PDF</a>
                                        <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/HOJA_SEG_${quote.id}`}>Hoja de Seguridad</a>
                                    </div>
                                    {quote.aprobador2 && quote.aprobador1 &&
                                        <button
                                            className={selectedQuoteId === quote.id ?
                                                "button is-success is-inverted" :
                                                "button is-success is-outlined"
                                            }
                                            onClick={() => {
                                                setSelectedQuoteId(quote.id  as string)
                                                setShowModalConpaq(true)
                                            }}
                                        >Procesada</button>
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
                    show={showDescriptionModal}
                    total={currentTotal}
                />
            </Modal>
            <Modal showModal={showModalConpaq} onClick={() => setShowModalConpaq(false)}>
                <ConpaqModal
                    folio={selectedQuoteId as string}
                    onClickCancelar={() => setShowModalConpaq(false)}
                />
            </Modal>
        </div >
    );
}

export { DisplayCotizacionesAprobadas };

