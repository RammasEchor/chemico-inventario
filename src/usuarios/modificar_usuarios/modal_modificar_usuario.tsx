import { Formik } from "formik";
import { PropsWithChildren, useEffect, useState } from "react";
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { UserFields, getAprobadores, getAprobadores2, getRoles } from "../../apis/api_usuarios";
import { SelectWithLabel } from "../../form_components/select_with_label";
import Tabla from "../../form_components/table";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";

interface Props extends PropsWithChildren {
    onClickClose: () => void
    onClickModify: (user: UserFields) => void
    user: UserFields
}

interface RolAPIReturn {
    id: string,
    nombre: string
}

function ModalModificarUsuario(props: Props) {
    const [roles, setRoles] = useState<string[]>([]);
    const [plantas, setPlantas] = useState<string[]>([]);
    const [currentPlant, setCurrentPlant] = useState('');
    const [currentRole, setCurrentRole] = useState('')
    const [aprobadores1, setAprobadores1] = useState([])
    const [aprobadores2, setAprobadores2] = useState([])

    const [initialValues, setIntialValues] = useState({
        nombre: props.user.nombre,
        rol: props.user.rol,
        email: props.user.email,
        planta: props.user.planta,
        cveUsuario: props.user.cveUsuario,
        aprobador1: props.user.aprobador1,
        aprobador2: props.user.aprobador2,
        monto_aprobador: props.user.monto_aprobador
    })

    useEffect(() => {
        setCurrentPlant(props.user.planta)
        setCurrentRole(props.user.rol)
    }, [props.user.planta, props.user.rol])

    useEffect(() => {
        getRoles()
            .then(response => response.json())
            .then((data: RolAPIReturn[]) => {
                setRoles(data.map(rol => rol.nombre));
            });

        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
            });
    }, []);

    useEffect(() => {
        if (currentPlant) {
            getAprobadores(currentPlant)
                .then(response => response.json())
                .then(data => {
                    setAprobadores1(data)
                    setIntialValues(initialValues => {
                        return {
                            ...initialValues,
                            aprobador1: data[0]
                        }
                    })
                })

            getAprobadores2(currentPlant)
                .then(response => response.json())
                .then(data => {
                    setAprobadores2(data)
                    setIntialValues(initialValues => {
                        return {
                            ...initialValues,
                            aprobador2: data[0]
                        }
                    })
                })
        }
    }, [currentPlant])

    let extra_items = <></>
    if (currentRole === 'Cliente') {
        extra_items = (
            <div className="px-3">
                <SelectWithLabel name='aprobador1' label='Aprobador 1'>
                    {aprobadores1.map(ap1 => <option value={ap1} key={ap1}>{ap1}</option>)}
                </SelectWithLabel>
                <SelectWithLabel name='aprobador2' label='Aprobador 2'>
                    {aprobadores2.map(ap2 => <option value={ap2} key={ap2}>{ap2}</option>)}
                </SelectWithLabel>
            </div>
        )
    }
    else if (currentRole === 'Aprobador') {
        extra_items = (
            <div className="px-3">
                <TextInputLabelWarning name='monto_aprobador' label='Monto' />
            </div>
        )
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            isInitialValid={true}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                if (currentRole !== 'Cliente') {
                    values.aprobador1 = '-'
                    values.aprobador2 = '-'
                }
                if (currentRole !== 'Aprobador') {
                    values.monto_aprobador = '-'
                }

                props.onClickModify(values as UserFields)
            }}
        >
            {formikProps =>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{props.user.nombre}</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={props.onClickClose}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <Tabla cols={[
                            'Campo',
                            'Valor Actual',
                            'Valor Modificado',
                        ]}>
                            <tr>
                                <td className='has-text-weight-bold'>Nombre</td>
                                <td>{props.user.nombre}</td>
                                <td>
                                    <TextInputLabelWarning value={formikProps.values.nombre} name='nombre' label='' />
                                </td>
                            </tr>
                            <tr>
                                <td className='has-text-weight-bold'>Rol</td>
                                <td>{props.user.rol}</td>
                                <td>
                                    <SelectWithLabel
                                        onChange={e => {
                                            setCurrentRole(e.currentTarget.value)
                                            formikProps.setFieldValue('rol', e.currentTarget.value)
                                        }}
                                        value={formikProps.values.rol}
                                        name='rol'
                                        label=''
                                    >
                                        {roles.map(rol => <option value={rol} key={rol}>{rol}</option>)}
                                    </SelectWithLabel>
                                    {extra_items}
                                </td>
                            </tr>
                            <tr>
                                <td className='has-text-weight-bold'>Email</td>
                                <td>{props.user.email}</td>
                                <td>
                                    <TextInputLabelWarning value={formikProps.values.email} name='email' label='' />
                                </td>
                            </tr>
                            <tr>
                                <td className='has-text-weight-bold'>Planta</td>
                                <td>{props.user.planta}</td>
                                <td>
                                    <SelectWithLabel
                                        onChange={(e) => {
                                            setCurrentPlant(e.currentTarget.value)
                                            formikProps.setFieldValue('planta', e.currentTarget.value)
                                        }}
                                        value={formikProps.values.planta}
                                        name="planta"
                                        label=""
                                    >
                                        {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                                    </SelectWithLabel>
                                </td>
                            </tr>
                            <tr>
                                <td className='has-text-weight-bold'>Cve. Usuario</td>
                                <td>{props.user.cveUsuario}</td>
                                <td>
                                    <TextInputLabelWarning value={formikProps.values.cveUsuario} name='cveUsuario' label='' />
                                </td>
                            </tr>
                        </Tabla>
                    </section>
                    <footer className="modal-card-foot is-flex-direction-row-reverse">
                        <button
                            className="button is-success mx-1"
                            onClick={() => formikProps.handleSubmit()}
                        >Modificar</button>
                        <button
                            className="button mx-1"
                            onClick={props.onClickClose}
                        >Cancelar</button>
                    </footer>
                </div>
            }
        </Formik>
    );
}

export default ModalModificarUsuario