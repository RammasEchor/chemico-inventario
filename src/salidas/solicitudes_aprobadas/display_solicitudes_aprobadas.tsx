import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Solicitud, getSalidasAprobadas, postCerrarSalida } from "../../apis/api_material";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { dateParser } from "../../utilities/date_parser";

function DisplaySolicitudesAprobadas() {
    const { userKey } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSalidasAprobadas(userKey)
            .then(res => res.json())
            .then(data => {
                setSolicitudes(data)
            })
    }, [userKey]);

    function redIfNull(toCheck: string | undefined) {
        if (!toCheck)
            return "has-text-danger"

        return ""
    }

    function startClosing(folio: string)  {
        postCerrarSalida(folio, userKey)
            .then(_ => navigate(0))
    }

    return (
        <div className="box">
            <h4 className="title is-4">Solicitudes Aprobadas</h4>
            <Tabla cols={[
                'Fecha de Aprobación',
                'Solicitante',
                'Total',
                'Cerrar'
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
                                    className={"button is-danger is-outlined mr-2 mb-2"}
                                    onClick={() => startClosing(solicitud.id)}
                                >Cerrar</button>
                            </div>
                        </td>
                    </tr>
                )}
            </Tabla>
        </div >
    );
}

export default DisplaySolicitudesAprobadas;