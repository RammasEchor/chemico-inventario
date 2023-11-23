import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Solicitud, getSalidasPendientes, postAprobarSalida } from "../../apis/api_material";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { dateParser } from "../../utilities/date_parser";

function DisplaySolicitudesPendientes() {
    const { userKey } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSalidasPendientes(userKey)
            .then(res => res.json())
            .then(data => setSolicitudes(data))
    }, [userKey]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    function startApproved(folio: string)  {
        postAprobarSalida(folio, userKey)
            .then(_ => {
                navigate(0)
            })
    }

    return (
        <div className="box">
            <h4 className="title is-4">Solicitudes Pendientes</h4>
            <Tabla cols={[
                'Fecha de Aprobación',
                'Solicitante',
                'Total',
                'Aprobar'
            ]}>
                {solicitudes.map(solicitud =>
                    <tr
                        key={solicitud.id}
                    >
                        <td className={redIfNull(solicitud.fecha_aprob)}>
                            {solicitud.fecha_aprob ? dateParser(solicitud.fecha_aprob) : "Faltante"}
                        </td>
                        <td className={redIfNull(solicitud.solicitante)}>
                            {solicitud.solicitante ? solicitud.solicitante : "Faltante"}
                        </td>
                        <td className={redIfNull(solicitud.total)}>
                            {solicitud.total ? solicitud.total : "Faltante"}
                        </td>
                        <td>
                            <div className="block">
                                <button
                                    className={"button is-success is-outlined mr-2 mb-2"}
                                    onClick={() => startApproved(solicitud.id)}
                                >Aprobar</button>
                            </div>
                        </td>
                    </tr>
                )}
            </Tabla>
        </div >
    );
}

export default DisplaySolicitudesPendientes;