import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getPendingApproves, sendOneApproves } from "../../apis/api_cotizacion";
import { MasterQuoteFields } from "../../cotizacion/campos_cotizacion";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";

function DisplayAprobaciones() {
    const [quotes, setQuotes] = useState<MasterQuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>();
    const [anyApproved, setAnyApproved] = useState(false);
    const { userKey } = useAuth();

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
        return (<Navigate to="/" />);
    }

    function startApproved(folio: string | undefined) {
        sendOneApproves(userKey as string, folio)
            .then(response => response.text())
            .then(data => {
                if (data) {
                    setAnyApproved(true);
                }
            })
            .catch(error => console.log(error))
    }

    function startDecline(folio: string | undefined) {
        sendOneApproves(userKey as string, folio)
            .then(response => response.text())
            .then(data => {
                if (data) {
                    setAnyApproved(true);
                }
            })
            .catch(error => console.log(error))
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
                                {quote.descripcion ? quote.descripcion : "Sin Descripción"}
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
                                <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/COT_${quote.id}`}>PDF</a>
                            </td>
                            <td key={quote.id}>
                                <div className="block">
                                    <button
                                        className={selectedQuoteId === quote.id ?
                                            "button is-success is-inverted mr-2" :
                                            "button is-success is-outlined mr-2"
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
        </div >
    );
}

export { DisplayAprobaciones };

