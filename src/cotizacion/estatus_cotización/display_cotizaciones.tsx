import { useEffect, useState } from "react";
import { Modal } from "../../form_components/modal";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { getUserRoleFromString, Role } from "../../usuarios/campos_usuario";
import { approveQuote, getQuotes } from "../api_cotizacion";
import { getQuoteStatusFromString, QuoteFields, QuoteStatus } from "../campos_cotizacion";
import { QuoteDetail } from "../cotizacion_card";
import TablaCotizacion from "./tabla_cotizaciones";

function DisplayCotizacion() {
    const [quotes, setQuotes] = useState<QuoteFields[]>([]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>();
    const [showDetail, setShowDetail] = useState(false);
    const [detailQuote, setDetailQuote] = useState<QuoteFields>();
    const [updatedQuote, setUpdatedQuote] = useState(false);

    const { userRole, userKey } = useAuth();

    useEffect(() => {
        getQuotes(userRole, userKey)
            .then(response => response.json())
            .then((data: QuoteFields[]) => {
                setQuotes(data);
            });
    }, [updatedQuote, userRole, userKey]);

    function startApprovingQuote(id: string | undefined) {
        approveQuote(id)
            .then(response => {
                if (response.ok) {
                    setUpdatedQuote(updatedQuote => !updatedQuote);
                    setShowDetail(false);
                }
            });
    }

    return (
        <div className="box">
            <h4 className="title is-4">Cotizaciones</h4>
            <TablaCotizacion>
                {quotes.map(quote => {
                    return (
                        <tr id={quote.id}
                            key={quote.id}
                            onClick={() => setSelectedQuoteId(quote.id)}
                            className={selectedQuoteId === quote.id ? 'is-selected' : ''}
                        >
                            <td key={quote.nombre}>{quote.nombre}</td>
                            <td key={quote.parte}>{quote.parte}</td>
                            <td key={quote.fabricante}>{quote.fabricante}</td>
                            <td key={quote.cant}>{quote.cant}</td>
                            <td key={quote.presentacion}>{quote.presentacion}</td>
                            <td key={quote.unidad}>{quote.unidad}</td>
                            <td key={quote.planta}>{quote.planta}</td>
                            <td key={quote.area}>{quote.area}</td>
                            <td key={quote.area + quote.nombre}>
                                <div className="block">
                                    {
                                        getQuoteStatusFromString(quote.status) === QuoteStatus.Aprobada ?
                                            <button className="button is-success is-inverted">Aprobada</button>
                                            :
                                            getUserRoleFromString(userRole) !== Role.Cliente ?
                                                <button
                                                    className="button is-danger is-outlined"
                                                    onClick={() => {
                                                        setDetailQuote(quote);
                                                        setShowDetail(true);
                                                    }}
                                                >Pendiente</button>
                                                :
                                                <button
                                                    className="button is-danger is-inverted"
                                                >Pendiente</button>
                                    }
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </TablaCotizacion>
            <Modal showModal={showDetail} onClick={() => setShowDetail(false)}>
                <QuoteDetail
                    detail={detailQuote}
                    onClickX={() => setShowDetail(false)}
                    onClickAprobar={() => startApprovingQuote(detailQuote?.id)}
                />
            </Modal>

        </div >
    );
}

export default DisplayCotizacion