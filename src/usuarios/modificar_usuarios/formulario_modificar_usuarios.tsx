import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User, getUsers, modifyUser } from "../../apis/api_usuarios";
import { Modal } from "../../form_components/modal";
import Tabla from "../../form_components/table";
import ModalModificarUsuario from "./modal_modificar_usuario";

function FormularioModificarUsuarios() {
    const [users, setUsers] = useState<User[]>([]);
    const [userIdtoModify, setUserIdtoModify] = useState<string>();
    const [userToModify, setUserToModify] = useState<User>(new User());
    const [showModifyUserModal, setShowModifyUserModal] = useState(false);
    const [userWasModified, setUserWasModified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
            .then(response => response.json())
            .then((users: User[]) => {
                setUsers(users.map(user => {
                    user.contraseña = ""
                    return user
                }));
            });
    }, []);

    function startModifyUser(user: User) {
        modifyUser(user)
            .then(response => {
                response.text()
            })
            .then(data => {
                console.log(data)
                setUserWasModified(true)
            })
            .catch(error => console.log(error))
    }

    if (userWasModified) {
        navigate(0);
    }

    return (
        <div className='box'>
            <h4 className="title is-4">Modificar Usuario</h4>
            <Tabla cols={[
                'Nombre',
                'Rol',
                'Email',
                'Planta',
                'CveUsuario',
                'Acción'
            ]}>
                {users.map(user => {
                    return (
                        <tr id={user.id}
                            key={user.id}
                            onClick={() => setUserIdtoModify(user.id)}
                            className={userIdtoModify === user.id ? 'is-selected' : ''}
                        >
                            <td>{user.nombre}</td>
                            <td>{user.rol}</td>
                            <td>{user.email}</td>
                            <td>{user.planta}</td>
                            <td>{user.cveUsuario}</td>
                            <td>
                                <button className={`
                                    button 
                                    is-normal 
                                    is-info 
                                    ${userIdtoModify === user.id ? 'is-inverted' : 'is-outlined'}`}
                                    onClick={() => {
                                        setUserToModify(user)
                                        setShowModifyUserModal(true)
                                    }}
                                >Modificar</button>
                            </td>
                        </tr>
                    );
                })}
            </Tabla>
            <Modal key={userToModify.id} showModal={showModifyUserModal} onClick={() => setShowModifyUserModal(false)}>
                <ModalModificarUsuario
                    onClickClose={() => setShowModifyUserModal(false)}
                    onClickModify={startModifyUser}
                    user={userToModify}
                />
            </Modal >
        </div >
    );
}

export default FormularioModificarUsuarios