import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import { getPlants, PlantasAPI } from "../../apis/api_plantas";
import { createUser, getRoles } from "../../apis/api_usuarios";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";

interface RolAPIReturn {
    id: string,
    nombre: string
}

function FormularioAltaUsuario() {
    const [roles, setRoles] = useState<string[]>([]);
    const [userSubmitted, setUserSubmitted] = useState(false);
    const [plantas, setPlantas] = useState<string[]>([]);

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
                plant: 'Planta 1',
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
                    <SelectWithLabel name='rol' label='Rol'>
                        {roles.map(rol => <option value={rol} key={rol}>{rol}</option>)}
                    </SelectWithLabel>
                    <TextInputLabelWarning name='email' label='Email' />
                    <SelectWithLabel name="plant" label="Planta">
                        {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                    </SelectWithLabel>
                    <TextInputLabelWarning name='userKey' label='Clave de Usuario' />
                </div>
                <SubmitButton text='Crear Usuario' />
            </ShadowedForm>
        </Formik>
    );
}

export default FormularioAltaUsuario