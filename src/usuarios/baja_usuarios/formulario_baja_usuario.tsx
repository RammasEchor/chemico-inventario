import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import { getUsers } from "../../apis/api_usuarios";
import "../../css/inventario.css";
import Checkbox from "../../form_components/checkbox";
import WithdrawButton from "../../form_components/withdraw_button";
import TablaUsuarios from "./tabla_usuarios";

interface UserFields {
    id: string,
    nombre: string,
    contraseña: string,
    rol: string,
    email: string,
    planta: string,
    cveUsuario: string
}

function FormularioBajaUsuario() {
    const [users, setUsers] = useState<UserFields[]>([]);
    const [userIdtoDelete, setUserIdtoDelete] = useState<string>();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        getUsers()
            .then(response => response.json())
            .then((data: UserFields[]) => {
                setUsers(data);
            });
    }, []);

    if (deleted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            initialValues={{
                searchString: ''
            }}
            validationSchema={Yup.object({
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                fetch(`https://javaclusters-95554-0.cloudclusters.net/apiChemico-0.0.1-SNAPSHOT/api2/delUsr/${userIdtoDelete}/`)
                    .then(response => {
                        if (response.ok)
                            setDeleted(true);
                    })
            }}
        >
            <Form className='box'>
                <h4 className="title is-4">Baja de Usuario</h4>
                <div className='columns p-3 is-vcentered is-desktop'>
                    <input
                        className={`
                                input is-info
                                column
                        `}
                        type="text"
                        placeholder="Palabra o parte de palabra a buscar"
                        name='searchString'
                    />
                    <div className="column is-narrow">
                        <h6 className={`subtitle is-6`}>Dentro de:</h6>
                    </div>
                    <div className="column is-narrow is-gapless">
                        <div className="columns is-tablet">
                            <div className="column is-narrow-desktop is-flex is-flex-direction-column is-justify-content-space-between">
                                <Checkbox>Nombre</Checkbox>
                                <Checkbox>Rol</Checkbox>
                            </div>
                            <div className="column is-narrow-desktop is-flex is-flex-direction-column is-justify-content-space-between">
                                <Checkbox>Email</Checkbox>
                                <Checkbox>Planta</Checkbox>
                            </div>
                            <div className="column is-narrow-desktop is-flex is-flex-direction-column is-justify-content-space-between">
                                <Checkbox>CveUsuario</Checkbox>
                            </div>
                        </div>
                    </div>
                    <div className="column is-narrow-desktop">
                        <button className="button is-info is-medium">Buscar</button>
                    </div>
                </div>
                <TablaUsuarios>
                    {users.map(user => {
                        return (
                            <tr id={user.id}
                                key={user.id}
                                onClick={() => setUserIdtoDelete(user.id)}
                                className={userIdtoDelete === user.id ? 'is-selected' : ''}
                            >
                                <td key={user.nombre}>{user.nombre}</td>
                                <td key={user.rol}>{user.rol}</td>
                                <td key={user.email}>{user.email}</td>
                                <td key={user.planta}>{user.planta}</td>
                                <td key={user.cveUsuario}>{user.cveUsuario}</td>
                            </tr>
                        );
                    })}
                </TablaUsuarios>
                <WithdrawButton text='Eliminar Usuario' />
            </Form>
        </Formik>
    );
}

export default FormularioBajaUsuario