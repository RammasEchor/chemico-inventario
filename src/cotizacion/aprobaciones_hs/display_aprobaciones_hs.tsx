import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { sendOneDecline } from "../../apis/api_cotizacion";
import { SecuritySheet, getPendingSecuritySheets, startApprovingSecuritySheet } from "../../apis/api_hoja_seguridad";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";

function DisplayAprobacionesHS() {
    const [securitySheets, setSecuritySheets] = useState<SecuritySheet[]>([
        {
            id: "46",
            descripcion: "Produccion",
            solicitante: "Paco1",
            aprobador1: "",
            aprobador2: "",
            fechaAprob1: "",
            total: "90.0",
            orden: "-1",
            fechaEstimada: "",
            fechaAprob2: ""
        }
    ]);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string>("");
    const { userKey } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getPendingSecuritySheets(userKey)
            .then(response =>
                response.json()
            )
            .then((data: SecuritySheet[]) => {
                console.log(data)
                setSecuritySheets(data);
            })
            .catch(error => {
                console.log(error)
            })
    }, [userKey])

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    return (
        <div className="box">
            <h4 className="title is-4">Hojas de Seguridad por Aprobar</h4>
            <Tabla cols={[
                'Folio',
                'Descripción',
                'Solicitante',
                'Total',
                'Orden',
                'Revisar',
                'Acción'
            ]}>
                {securitySheets.map(securitySheet => {
                    return (
                        <tr id={securitySheet.id}
                            key={securitySheet.id}
                            onClick={() => setSelectedQuoteId(securitySheet.id as string)}
                            className={selectedQuoteId === securitySheet.id ? 'is-selected' : ''}
                        >
                            <td className={redIfNull(securitySheet.id)}>
                                {securitySheet.id ? securitySheet.id : "Sin Descripción"}
                            </td>
                            <td style={{ width: "15%" }} className={redIfNull(securitySheet.descripcion)}>
                                {securitySheet.descripcion ? securitySheet.descripcion : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(securitySheet.solicitante)}>
                                {securitySheet.solicitante ? securitySheet.solicitante : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(securitySheet.total)}>
                                {securitySheet.total ? securitySheet.total : "Sin Descripción"}
                            </td>
                            <td className={redIfNull(securitySheet.orden)}>
                                {securitySheet.orden ? securitySheet.orden : "Sin Descripción"}
                            </td>
                            <td>
                                <div className="is-flex is-flex-direction-column">
                                    <a className="is-underlined" href={`https://javaclusters-95554-0.cloudclusters.net/pdfs/HOJA_SEG_${securitySheet.id}`}>Hoja de Seguridad</a>
                                </div>
                            </td>
                            <td>
                                <div className="block">
                                    <button
                                        className={selectedQuoteId === securitySheet.id ?
                                            "button is-success is-inverted mr-2 mb-2" :
                                            "button is-success is-outlined mr-2 mb-2"
                                        }
                                        onClick={() => {
                                            startApprovingSecuritySheet(securitySheet.id)
                                                .then(response => {
                                                    if (response.ok) {
                                                        navigate(0);
                                                    }

                                                    return Promise.reject(response)
                                                })
                                                .catch(error => console.log(error))
                                        }}
                                    >Aprobar</button>
                                    <button
                                        className={selectedQuoteId === securitySheet.id ?
                                            "button is-danger is-inverted mr-2 mb-2" :
                                            "button is-danger is-outlined mr-2 mb-2"
                                        }
                                        onClick={() => {
                                            sendOneDecline(securitySheet.id)
                                                .then(response => response.text())
                                                .then(() => navigate(0))
                                                .catch(error => console.log(error))
                                        }}
                                    >Rechazar</button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </Tabla>
        </div >
    )
}

export default DisplayAprobacionesHS