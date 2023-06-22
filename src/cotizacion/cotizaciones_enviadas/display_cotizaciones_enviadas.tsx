import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { MasterQuoteFields, getToApproves, insertToApprove } from "../../apis/api_cotizacion";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { dateParser } from "../../utilities/date_parser";

function DisplayCotizacionesEnviadas() {
    const [quotes, setQuotes] = useState<MasterQuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>();
    const { userKey } = useAuth();
    const [anyApproved, setAnyApproved] = useState(false);

    useEffect(() => {
        getToApproves(userKey)
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

    function startApproved(id: string | undefined) {
        insertToApprove(id)
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
            <h4 className="title is-4">Cotizaciones Enviadas</h4>
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
                            className={selectedQuoteId === quote.id ? 'is-selected' : ''}
                        >
                            <td className={redIfNull(quote.id)}>
                                {quote.id ? quote.id : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(quote.descripcion)}>
                                {quote.descripcion ? quote.descripcion : "Sin Descripción"}
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
                                <div className="is-flex is-flex-direction-column">
                                    <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/COT_${quote.id}`}>PDF</a>
                                    <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/HOJA_SEG_${quote.id}`}>Hoja de Seguridad</a>
                                </div>
                            </td>
                            <td>
                                <div className="block">
                                    <button
                                        className={selectedQuoteId === quote.id ?
                                            "button is-info is-inverted" :
                                            "button is-info is-outlined"
                                        }
                                        onClick={() => {
                                            startApproved(quote.id)
                                        }}
                                    >Enviar a Aprobar</button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </Tabla>
        </div >
    );
}

export default DisplayCotizacionesEnviadas;
