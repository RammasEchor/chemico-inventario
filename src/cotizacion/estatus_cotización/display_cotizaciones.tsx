import { useEffect, useState } from "react";
import { Modal } from "../../form_components/modal";
import { getQuotes } from "../api_cotizacion";
import { QuoteFields } from "../campos_cotizacion";
import { QuoteDetail } from "../cotizacion_card";
import TablaCotizacion from "./tabla_cotizaciones";

function DisplayCotizacion() {
    const [quotes, setQuotes] = useState<QuoteFields[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<string>();
    const [showDetail, setShowDetail] = useState(false);
    const [detailQuote, setDetailQuote] = useState<QuoteFields>();

    useEffect(() => {
        getQuotes()
            .then(response => response.json())
            .then((data: QuoteFields[]) => {
                setQuotes(data);
            });
    }, []);

    return (
        <div className="box">
            <h4 className="title is-4">Cotizaciones</h4>
            <TablaCotizacion>
                {quotes.map(quote => {
                    return (
                        <tr id={quote.id}
                            key={quote.id}
                            onClick={() => setSelectedQuote(quote.id)}
                            className={selectedQuote === quote.id ? 'is-selected' : ''}
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
                                <button
                                    className="button"
                                    onClick={() => {
                                        setDetailQuote(quote);
                                        setShowDetail(true);
                                    }}
                                >Button</button>
                            </td>
                        </tr>
                    );
                })}
            </TablaCotizacion>
            <Modal showModal={showDetail} onClick={() => setShowDetail(false)}>
                <QuoteDetail detail={detailQuote} onClickX={() => setShowDetail(false)} />
            </Modal>

        </div >
    );
}

export default DisplayCotizacion