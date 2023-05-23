import { PropsWithChildren, useEffect, useState } from "react";
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { getRoles } from "../../apis/api_usuarios";
import SelectModifyModal from "../../form_components/select_modify_modal";
import Tabla from "../../form_components/table";
import TextInputModifyModal from "../../form_components/text_input_modify_modal";
import { UserFields } from "../campos_usuario";

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
    const [modifiedUser, setModifiedUser] = useState<UserFields>({ ...props.user })
    const [roles, setRoles] = useState<string[]>([]);
    const [plantas, setPlantas] = useState<string[]>([]);

    function updateUser(field: string, value: string) {
        setModifiedUser(modifiedUser => {
            modifiedUser[field] = value
            return modifiedUser
        })
    }

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

    return (
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
                            <TextInputModifyModal
                                initialValue={props.user.nombre}
                                fieldName="nombre"
                                setCurrentValue={updateUser}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Rol</td>
                        <td>{props.user.rol}</td>
                        <td>
                            <SelectModifyModal
                                initialValue={props.user.rol}
                                fieldName="rol"
                                options={roles}
                                setCurrentValue={updateUser}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Email</td>
                        <td>{props.user.email}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.user.email}
                                fieldName="email"
                                setCurrentValue={updateUser}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Planta</td>
                        <td>{props.user.planta}</td>
                        <td>
                            <SelectModifyModal
                                initialValue={props.user.planta}
                                fieldName="planta"
                                options={plantas}
                                setCurrentValue={updateUser}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className='has-text-weight-bold'>Cve. Usuario</td>
                        <td>{props.user.cveUsuario}</td>
                        <td>
                            <TextInputModifyModal
                                initialValue={props.user.cveUsuario}
                                fieldName="cveUsuario"
                                setCurrentValue={updateUser}
                            />
                        </td>
                    </tr>
                </Tabla>
            </section>
            <footer className="modal-card-foot is-flex-direction-row-reverse">
                <button
                    className="button is-success mx-1"
                    onClick={() => props.onClickModify(modifiedUser)}
                >Modificar</button>
                <button
                    className="button mx-1"
                    onClick={props.onClickClose}
                >Cancelar</button>
            </footer>
        </div>
    );
}

export default ModalModificarUsuario