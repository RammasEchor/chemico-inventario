import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from 'yup';
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { createUser, getAprobadores, getAprobadores2, getRoles } from "../../apis/api_usuarios";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { appendFieldRequiredSpanish } from "../../utilities/error_messages";
import { UserFields } from "../campos_usuario";

interface RolAPIReturn {
    id: string,
    nombre: string
}

function FormularioAltaUsuario() {
    const [userSubmitted, setUserSubmitted] = useState(false);

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
        aprobador1: '',
        aprobador2: '',
        monto_aprobador: ''
    })

    useEffect(() => {
        getRoles()
            .then(response => response.json())
            .then((data: RolAPIReturn[]) => {
                setRoles(data.map(rol => rol.nombre));
                setCurrentRole(data[0].nombre)
                setIntialValues(initialValues => {
                    return { ...initialValues, rol: data[0].nombre }
                })
            });

        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
                setCurrentPlant(data[0].nombre)
                setIntialValues(initialValues => {
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

    if (userSubmitted) {
        return (<Navigate to="/" />);
    }

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
            validationSchema={Yup.object({
                name: Yup.string()
                    .required(appendFieldRequiredSpanish('Nombre')),
                password: Yup.string()
                    .required(appendFieldRequiredSpanish('Contraseña')),
                rol: Yup.string()
                    .required(appendFieldRequiredSpanish('Rol')),
                email: Yup.string()
                    .email('Email inválido')
                    .required(appendFieldRequiredSpanish('Email')),
                plant: Yup.string()
                    .required(appendFieldRequiredSpanish('Planta')),
                userKey: Yup.string()
                    .required(appendFieldRequiredSpanish('Clave de Usuario'))
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                if (currentRole !== 'Cliente') {
                    values.aprobador1 = '-'
                    values.aprobador2 = '-'
                }
                if (currentRole !== 'Aprobador') {
                    values.monto_aprobador = '-'
                }
                createUser(values as UserFields)
                    .then(() => setUserSubmitted(true))
                    .catch(error => console.error(error))
            }}
        >
            {props =>
                <ShadowedForm>
                    <h4 className="title is-4">Alta de Usuario</h4>
                    <div className="is-flex is-flex-direction-column">
                        <TextInputLabelWarning name='nombre' label='Nombre' />
                        <TextInputLabelWarning name='contraseña' label='Contraseña' type='password' />
                        <SelectWithLabel
                            onChange={(e) => {
                                setCurrentPlant(e.currentTarget.value)
                                props.setFieldValue('planta', e.currentTarget.value)
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
                                props.setFieldValue('rol', e.currentTarget.value)
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
                </ShadowedForm>
            }
        </Formik>
    );
}

export default FormularioAltaUsuario