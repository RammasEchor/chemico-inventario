import { Formik } from "formik";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getInfoCot, updateCotTotal } from "../../apis/api_cotizacion";
import { Role, getUserRoleFromString } from "../../apis/api_usuarios";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { useAuth } from "../../login/auth-provider/auth_provider";

interface Props extends ComponentPropsWithoutRef<'div'> {
    titulo: string
    cotId: string
    total: string
    show: boolean
    solicitante: string
    onClickCancelar: () => void
}

function FullQuoteDetail({ titulo, cotId, total, onClickCancelar, solicitante, show }: Props) {
    interface infoType {
        id: number,
        nombre: string,
        parte: string,
        fabricante: string,
        cant: number,
        presentacion: string,
        unidad: string,
        planta: string,
        area: string,
        status: string
    }
    const [info, setInfo] = useState([])
    const navigate = useNavigate();
    const { userRole } = useAuth();
    const userRoleType = getUserRoleFromString(userRole);

    useEffect(() => {
        if (show) {
            setInfo([])
            getInfoCot(cotId)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setInfo(data)
                })
                .catch(error => console.log(error))
        }
    }, [cotId, show])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                total: total
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                updateCotTotal(values.total, cotId)
                    .then(response => {
                        response.json()
                    })
                    .then(() => {
                        navigate(0)
                    })
            }}
        >
            {formikProps =>
                <div className='card'>
                    <header className='card-header'>
                        <p className='card-header-title'>
                            {titulo}
                        </p>
                    </header>
                    <div className='card-content'>
                        <div className='table-container'>
                            <table className='table is-striped is-hoverable is-fullwidth is-bordered'>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Parte</th>
                                        <th>Fabricante</th>
                                        <th>Cantidad</th>
                                        <th>Presentación</th>
                                        <th>Unidad</th>
                                        <th>Planta</th>
                                        <th>Área</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.map((item: infoType) =>
                                        <tr>
                                            <td>{item.nombre}</td>
                                            <td>{item.parte}</td>
                                            <td>{item.fabricante}</td>
                                            <td>{item.cant}</td>
                                            <td>{item.presentacion}</td>
                                            <td>{item.unidad}</td>
                                            <td>{item.planta}</td>
                                            <td>{item.area}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <TextInputLabelWarning
                            label="Solicitante"
                            name="total"
                            value={solicitante}
                            readOnly={true}
                        />
                        <TextInputLabelWarning
                            label="Total"
                            name="total"
                            value={formikProps.values.total ?? "0"}
                            readOnly={!(userRoleType === Role.Chemico || userRoleType === Role.Admin)}
                        />
                    </div>
                    <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                        <button className="button is-danger is-outlined" onClick={onClickCancelar}>Cerrar</button>
                        {
                            (userRoleType === Role.Chemico ||
                                userRoleType === Role.Admin)
                            &&
                            <button
                                className="button is-success mx-1"
                                type="submit"
                                onClick={() => formikProps.handleSubmit()}
                            >Modificar Total</button>
                        }
                    </footer>
                </div>
            }
        </Formik>
    );
}

export default FullQuoteDetail