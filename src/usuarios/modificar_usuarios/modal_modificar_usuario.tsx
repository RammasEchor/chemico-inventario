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
                })

            getAprobadores2(currentPlant)
                .then(response => response.json())
                .then(data => {
                    setAprobadores2(data)
                })
        }
    }, [currentPlant])

    let extra_items = <></>
    if (currentRole === 'Cliente') {
        extra_items = (
            <div className="px-3">
                <SelectWithLabel name='aprob1' label='Aprobador 1'>
                    {
                        props.user.aprob1 === "-" &&
                        <option selected disabled value={"-"}>{"-"}</option>
                    }
                    {aprobadores1.map(ap1 => {
                        if (ap1 === props.user.aprob1)
                            return <option selected value={ap1} key={ap1}>{ap1}</option>

                        return <option value={ap1} key={ap1}>{ap1}</option>
                    })}
                </SelectWithLabel>
                <SelectWithLabel name='aprob2' label='Aprobador 2'>
                    {
                        props.user.aprob2 === "-" &&
                        <option selected disabled value={"-"}>{"-"}</option>
                    }
                    {aprobadores2.map(ap2 => {
                        if (ap2 === props.user.aprob2)
                            return <option selected value={ap2} key={ap2}>{ap2}</option>

                        return <option value={ap2} key={ap2}>{ap2}</option>
                    })}
                </SelectWithLabel>
            </div>
        )
    }

    return (
        <Formik
            initialValues={{
                id: props.user.id,
                nombre: props.user.nombre,
                rol: props.user.rol,
                email: props.user.email,
                planta: props.user.planta,
                cveUsuario: props.user.cveUsuario,
                aprob1: props.user.aprob1,
                aprob2: props.user.aprob2,
                monto: props.user.monto
            }}
            isInitialValid={true}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                if (currentRole !== 'Cliente') {
                    values.aprob1 = '-'
                    values.aprob2 = '-'
                }
                if (currentRole !== 'Aprobador') {
                    values.monto = '-'
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
                                    {
                                        currentRole === 'Aprobador' &&
                                        <div className="px-3">
                                            <TextInputLabelWarning value={formikProps.values.monto} name='monto' label='Monto' />
                                        </div>
                                    }
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
                            type="submit"
                            onClick={() => formikProps.handleSubmit()}
                        >Modificar</button>
                        <button
                            className="button mx-1"
                            type="button"
                            onClick={props.onClickClose}
                        >Cancelar</button>
                    </footer>
                </div>
            }
        </Formik>
    );
}

export default ModalModificarUsuario