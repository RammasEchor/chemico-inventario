import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { createUser, getRoles } from "../api_usuarios";

interface RolAPIReturn {
    id: string,
    nombre: string
}

function FormularioAltaUsuario() {
    const [roles, setRoles] = useState<string[]>([]);
    const [userSubmitted, setUserSubmitted] = useState(false);

    useEffect(() => {
        getRoles()
            .then(response => response.json())
            .then((data: RolAPIReturn[]) => {
                setRoles(data.map(rol => rol.nombre));
            });
    }, []);

    if (userSubmitted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            initialValues={{
                name: '',
                password: '',
                rol: 'Admin',
                email: '',
                plant: '',
                userKey: ''
            }}

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
                createUser(values)
                    .then(() => setUserSubmitted(true))
                    .catch(error => console.error(error))
            }}
        >
            <ShadowedForm>
                <h4 className="title is-4">Alta de Usuario</h4>
                <div className="is-flex is-flex-direction-column">
                    <TextInputLabelWarning name='name' label='Nombre' />
                    <TextInputLabelWarning name='password' label='Contraseña' type='password' />
                    <label className="is-size-5">Rol</label>
                    <div className="select is-info mb-3 is-fullwidth">
                        <Field className="is-fullwidth" name="rol" as="select">
                            {roles.map(rol => <option value={rol} key={rol}>{rol}</option>)}
                        </Field>
                    </div>
                    <TextInputLabelWarning name='email' label='Email' />
                    <TextInputLabelWarning name='plant' label='Planta' />
                    <TextInputLabelWarning name='userKey' label='Clave de Usuario' />
                </div>
                <SubmitButton text='Crear Usuario' />
            </ShadowedForm>
        </Formik>
    );
}

export default FormularioAltaUsuario