import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from 'yup';
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { UserFields, createUser, getAprobadores, getAprobadores2, getRoles } from "../../apis/api_usuarios";
import LoadingModal from "../../form_components/loading_modal";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { appendFieldRequiredSpanish } from "../../utilities/error_messages";

interface RolAPIReturn {
    id: string,
    nombre: string
}

function FormularioAltaUsuario() {
    const [userSubmitted, setUserSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(2);

    const [roles, setRoles] = useState<string[]>([]);
    const [plantas, setPlantas] = useState<string[]>([]);
    const [currentPlant, setCurrentPlant] = useState('');
    const [currentRole, setCurrentRole] = useState('')

    const [aprobadores1, setAprobadores1] = useState([])
    const [aprobadores2, setAprobadores2] = useState([])

    const [initialValues, setIntialValues] = useState({
        nombre: '',
        contraseña: '',
        rol: '',
        email: '',
        planta: '',
        cveUsuario: '',
        aprob1: '',
        aprob2: '',
        monto: ''
    })

    useEffect(() => {
        getRoles()
            .then(response => response.json())
            .then((data: RolAPIReturn[]) => {
                setRoles(data.map(rol => rol.nombre));
                setCurrentRole(data[0].nombre)
                setIntialValues(initialValues => {
                    setShowModal(showModal => showModal - 1)
                    return { ...initialValues, rol: data[0].nombre }
                })
            });

        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
                setCurrentPlant(data[0].nombre)
                setIntialValues(initialValues => {
                    setShowModal(showModal => showModal - 1)
                    return { ...initialValues, planta: data[0].nombre }
                })
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
                            aprob1: data[0]
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
                            aprob2: data[0]
                        }
                    })
                })
        }
    }, [currentPlant])

    if (userSubmitted) {
        return (<Navigate to="/" />);
    }

    let extra_items = <></>
    if (currentRole === 'Cliente') {
        extra_items = (
            <div className="px-3">
                <SelectWithLabel name='aprob1' label='Aprobador 1'>
                    {aprobadores1.map(ap1 => <option value={ap1} key={ap1}>{ap1}</option>)}
                </SelectWithLabel>
                <SelectWithLabel name='aprob2' label='Aprobador 2'>
                    {aprobadores2.map(ap2 => <option value={ap2} key={ap2}>{ap2}</option>)}
                </SelectWithLabel>
            </div>
        )
    }
    else if (currentRole === 'Aprobador') {
        extra_items = (
            <div className="px-3">
                <TextInputLabelWarning name='monto' label='Monto' />
            </div>
        )
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                nombre: Yup.string()
                    .required(appendFieldRequiredSpanish('Nombre')),
                contraseña: Yup.string()
                    .required(appendFieldRequiredSpanish('Contraseña')),
                rol: Yup.string()
                    .required(appendFieldRequiredSpanish('Rol')),
                email: Yup.string()
                    .email('Email inválido')
                    .required(appendFieldRequiredSpanish('Email')),
                planta: Yup.string()
                    .required(appendFieldRequiredSpanish('Planta')),
                cveUsuario: Yup.string()
                    .required(appendFieldRequiredSpanish('Clave de Usuario')),
                aprob1: Yup.string(),
                aprob2: Yup.string(),
                monto: Yup.string()
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                if (currentRole !== 'Cliente') {
                    values.aprob1 = '-'
                    values.aprob2 = '-'
                }
                if (currentRole !== 'Aprobador') {
                    values.monto = '-'
                }
                createUser(values as UserFields)
                    .then(response => {
                        if (!response.ok)
                            return Promise.reject(response)

                        setUserSubmitted(true)
                    })
                    .catch(error => console.error(error))
            }}
        >
            {formikProps =>
                <ShadowedForm>
                    <h4 className="title is-4">Alta de Usuario</h4>
                    <div className="is-flex is-flex-direction-column">
                        <TextInputLabelWarning name='nombre' label='Nombre' />
                        <TextInputLabelWarning name='contraseña' label='Contraseña' type='password' />
                        <SelectWithLabel
                            onChange={e => {
                                setCurrentPlant(e.currentTarget.value)
                                formikProps.setFieldValue('planta', e.currentTarget.value)
                            }}
                            value={currentPlant}
                            name="planta"
                            label="Planta"
                        >
                            {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                        </SelectWithLabel>
                        <SelectWithLabel
                            onChange={e => {
                                setCurrentRole(e.currentTarget.value)
                                formikProps.setFieldValue('rol', e.currentTarget.value)
                            }}
                            value={currentRole}
                            name='rol'
                            label='Rol'
                        >
                            {roles.map(rol => <option value={rol} key={rol}>{rol}</option>)}
                        </SelectWithLabel>
                        {extra_items}
                        <TextInputLabelWarning name='email' label='Email' />
                        <TextInputLabelWarning name='cveUsuario' label='Clave de Usuario' />
                    </div>
                    <SubmitButton text='Crear Usuario' />
                    <LoadingModal show={showModal > 0} />
                </ShadowedForm>
            }
        </Formik>
    );
}

export default FormularioAltaUsuario