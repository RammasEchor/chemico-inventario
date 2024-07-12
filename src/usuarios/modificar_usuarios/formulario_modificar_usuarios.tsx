import { CellButton } from "chemico-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User, getUsers, modifyUser } from "../../apis/api_usuarios";
import { Modal } from "../../form_components/modal";
import Tabla from "../../form_components/table";
import ModalAsignarProductos from "./modalAsignarProductos";
import ModalModificarUsuario from "./modal_modificar_usuario";

function FormularioModificarUsuarios() {
    const [users, setUsers] = useState<User[]>([]);
    const [userIdtoModify, setUserIdtoModify] = useState<string>();
    const [userToModify, setUserToModify] = useState<User>(new User());
    const [showModifyUserModal, setShowModifyUserModal] = useState(false);
    const [userWasModified, setUserWasModified] = useState(false);
    const [showAsignProductModal, setShowAsignProductModal] = useState(false);
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
                            key={user.cveUsuario}
                            onClick={() => setUserIdtoModify(user.id)}
                            className={userIdtoModify === user.id ? 'is-selected' : ''}
                        >
                            <td>{user.nombre}</td>
                            <td>{user.rol}</td>
                            <td>{user.email}</td>
                            <td>{user.planta}</td>
                            <td>{user.cveUsuario}</td>
                            <td className="is-flex is-justify-content-center">
                                <CellButton
                                    className="button is-primary is-light mr-2"
                                    onClick={() => {
                                        setUserToModify(user);
                                        setShowAsignProductModal(true);
                                    }}
                                >
                                    Asignar Producto
                                </CellButton>
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
            <Modal key={userToModify.id + "modificarUsuario"} showModal={showModifyUserModal} onClick={() => setShowModifyUserModal(false)}>
                <ModalModificarUsuario
                    onClickClose={() => setShowModifyUserModal(false)}
                    onClickModify={startModifyUser}
                    user={userToModify}
                />
            </Modal >
            <ModalAsignarProductos
                key={userToModify.id + "asignarProducto"}
                clickedUser={userToModify}
                isActive={showAsignProductModal}
                setIsActive={setShowAsignProductModal}
            />
        </div >
    );
}

export default FormularioModificarUsuarios