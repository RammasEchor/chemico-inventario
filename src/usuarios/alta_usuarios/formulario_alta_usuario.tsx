import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from 'yup';
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { createUser, getAprobadores, getRoles } from "../../apis/api_usuarios";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";

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
        name: '',
        password: '',
        rol: '',
        email: '',
        plant: '',
        userKey: '',
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
                    return { ...initialValues, plant: data[0].nombre }
                })
            });
    }, []);

    useEffect(() => {
        if (currentPlant) {
            getAprobadores(currentPlant)
                .then(response => response.json())
                .then(data => {
                    setAprobadores1(data)
                    setAprobadores2(data)
                    setIntialValues(initialValues => {
                        return {
                            ...initialValues,
                            aprobador1: data[0],
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
                    .required(),
                password: Yup.string()
                    .required(),
                rol: Yup.string(),
                email: Yup.string()
                    .email('Email inválido')
                    .required(),
                plant: Yup.string()
                    .required(),
                userKey: Yup.string()
                    .required()
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
                createUser(values)
                    .then(() => setUserSubmitted(true))
                    .catch(error => console.error(error))
            }}
        >
            {props =>
                <ShadowedForm>
                    <h4 className="title is-4">Alta de Usuario</h4>
                    <div className="is-flex is-flex-direction-column">
                        <TextInputLabelWarning name='name' label='Nombre' />
                        <TextInputLabelWarning name='password' label='Contraseña' type='password' />
                        <SelectWithLabel
                            onChange={(e) => {
                                setCurrentPlant(e.currentTarget.value)
                                props.setFieldValue('plant', e.currentTarget.value)
                            }}
                            value={currentPlant}
                            name="plant"
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
                        <TextInputLabelWarning name='userKey' label='Clave de Usuario' />
                    </div>
                    <SubmitButton text='Crear Usuario' />
                </ShadowedForm>
            }
        </Formik>
    );
}

export default FormularioAltaUsuario