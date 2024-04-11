import { useEffect, useState } from "react";
import { MasterQuoteFields, getQuotesDeclined } from "../../apis/api_cotizacion";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { dateParser } from "../../utilities/date_parser";

function DisplayCotizacionesRechazadas() {
    const { userKey } = useAuth();
    const [cotRechazadas, setCotRechazadas] = useState(Array<MasterQuoteFields>);
    const [selectedQuoteId, setSelectedQuoteId] = useState("");

    useEffect(() => {
        getQuotesDeclined(userKey as string)
            .then(response => response.json())
            .then((data: MasterQuoteFields[]) => {
                setCotRechazadas(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [userKey]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    return (
        <div className="box">
            <h4 className="title is-4">Cotizaciones Rechazadas</h4>
            <Tabla cols={[
                'Folio',
                'Descripción',
                'Aprobador 1',
                'Aprobador 2',
                'Fecha Aprobación 1',
                'Fecha Aprobación 2',
                'Orden',
                'Total',
            ]}>
                {cotRechazadas.map(cot => {
                    return (
                        <tr id={cot.id}
                            key={cot.id}
                            onClick={() => setSelectedQuoteId(cot.id as string)}
                            className={(selectedQuoteId === cot.id ? 'is-selected' : '')}
                        >
                            <td className={redIfNull(cot.id)}>
                                {cot.id ? cot.id : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(cot.descripcion)}>
                                {cot.descripcion ? cot.descripcion : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(cot.aprobador1)}>
                                {cot.aprobador1 ? cot.aprobador1 : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(cot.aprobador2)}>
                                {cot.aprobador2 ? cot.aprobador2 : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(cot.fechaAprob1)}>
                                {cot.fechaAprob1 ? dateParser(cot.fechaAprob1) : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(cot.fechaAprob2)}>
                                {cot.fechaAprob2 ? dateParser(cot.fechaAprob2) : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(cot.orden)}>
                                {cot.orden ? cot.orden : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(cot.total)}>
                                {cot.total ? cot.total : "Sin Descripción"}
                            </td>
                        </tr>
                    );
                })}
            </Tabla>
        </div>
    );
}

export default DisplayCotizacionesRechazadas