import { useEffect, useState } from "react";
import ProtectedRoute from "../../login/protected-route/protected_route";
import NavBar from "../../mainpage/navbar/navbar";
import TablaCotizacion from "./tabla_cotizacion";

interface QuoteFields {
    id: string,
    nombre: string,
    parte: string,
    fabricante: string,
    cant: string,
    presentacion: string,
    unidad: string,
    planta: string,
    area: string
}

function EstatusCotizacion() {
    const [quotes, setQuotes] = useState<QuoteFields[]>([]);
    const [prodIdToDelete, setProdIdToDelete] = useState<string>();

    useEffect(() => {
        fetch('https://javaclusters-95554-0.cloudclusters.net/apiChemico-0.0.1-SNAPSHOT/api2/cotizaciones/')
            .then(response => response.json())
            .then((data: QuoteFields[]) => {
                setQuotes(data);
            });
    }, []);

    return (
        <ProtectedRoute>
            <NavBar />
            <div className="box">
                <h4 className="title is-4">Cotizaciones</h4>
                <TablaCotizacion>
                    {quotes.map(quote => {
                        return (
                            <tr id={quote.id}
                                key={quote.id}
                                onClick={() => setProdIdToDelete(quote.id)}
                                className={prodIdToDelete === quote.id ? 'is-selected' : ''}
                            >
                                <td key={quote.nombre}>{quote.nombre}</td>
                                <td key={quote.parte}>{quote.parte}</td>
                                <td key={quote.fabricante}>{quote.fabricante}</td>
                                <td key={quote.cant}>{quote.cant}</td>
                                <td key={quote.presentacion}>{quote.presentacion}</td>
                                <td key={quote.unidad}>{quote.unidad}</td>
                                <td key={quote.planta}>{quote.planta}</td>
                                <td key={quote.area}>{quote.area}</td>
                            </tr>
                        );
                    })}
                </TablaCotizacion>
            </div>
        </ProtectedRoute>
    );
}

export default EstatusCotizacion