import { CellButton } from "chemico-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Role,
  User,
  getUserRoleFromString,
  getUsers,
  modifyUser,
} from "../../apis/api_usuarios";
import { Modal } from "../../form_components/modal";
import Tabla from "../../form_components/table";
import ModalModificarUsuario from "./modal_modificar_usuario";
import ModalAsignarAlmacenes from "./modalAsignarAlmacenes";
import ModalAsignarPlantas from "./modalAsignarPlantas";
import ModalAsignarProductos from "./modalAsignarProductos";

function FormularioModificarUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [userIdtoModify, setUserIdtoModify] = useState<string>();
  const [userToModify, setUserToModify] = useState<User>(new User());
  const [showModifyUserModal, setShowModifyUserModal] = useState(false);
  const [userWasModified, setUserWasModified] = useState(false);
  const [showAsignProductModal, setShowAsignProductModal] = useState(false);
  const [showAsignPlantsModal, setShowAsignPlantsModal] = useState(false);
  const [showAssignWarehouseModal, setShowAssignWarehouseModal] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((response) => response.json())
      .then((users: User[]) => {
        setUsers(
          users.map((user) => {
            user.contraseña = "";
            return user;
          })
        );
      });
  }, []);

  function startModifyUser(user: User) {
    modifyUser(user)
      .then((response) => {
        response.text();
      })
      .then((data) => {
        console.log(data);
        setUserWasModified(true);
      })
      .catch((error) => console.log(error));
  }

  if (userWasModified) {
    navigate(0);
  }

  return (
    <div className="box">
      <h4 className="title is-4">Modificar Usuario</h4>
      <Tabla
        cols={["Nombre", "Rol", "Email", "Planta", "CveUsuario", "Acción"]}
      >
        {users.map((user) => {
          return (
            <tr
              id={user.id}
              key={user.cveUsuario}
              onClick={() => setUserIdtoModify(user.id)}
              className={userIdtoModify === user.id ? "is-selected" : ""}
            >
              <td>{user.nombre}</td>
              <td>{user.rol}</td>
              <td>{user.email}</td>
              <td>{user.planta}</td>
              <td>{user.cveUsuario}</td>
              <td className="is-flex is-flex-direction-column is-align-items-start">
                <div className="mb-3">
                  <CellButton
                    className="button is-primary is-light mr-2"
                    onClick={() => {
                      setUserToModify(user);
                      setShowAsignProductModal(true);
                    }}
                  >
                    Asignar Producto
                  </CellButton>
                  <button
                    className={`
                                      button
                                      is-normal
                                      is-info
                                      mr-2
                                      ${
                                        userIdtoModify === user.id
                                          ? "is-inverted"
                                          : "is-outlined"
                                      }`}
                    onClick={() => {
                      setUserToModify(user);
                      setShowModifyUserModal(true);
                    }}
                  >
                    Modificar
                  </button>
                </div>
                <div>
                  <button
                    className={`
                                    button 
                                    is-normal 
                                    is-info
                                    mr-3
                                    ${
                                      userIdtoModify === user.id
                                        ? "is-inverted"
                                        : "is-dark"
                                    }`}
                    onClick={() => {
                      setUserToModify(user);
                      setShowAssignWarehouseModal(true);
                    }}
                  >
                    Asignar Almacén
                  </button>
                  {getUserRoleFromString(user.rol) === Role.AprobSeguridad && (
                    <button
                      className={`
                                    button 
                                    is-normal 
                                    is-success
                                    ${
                                      userIdtoModify === user.id
                                        ? "is-inverted"
                                        : "is-dark"
                                    }`}
                      onClick={() => {
                        setUserToModify(user);
                        setShowAsignPlantsModal(true);
                      }}
                    >
                      Asignar Planta
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </Tabla>
      <Modal
        key={userToModify.id + "modificarUsuario"}
        showModal={showModifyUserModal}
        onClick={() => setShowModifyUserModal(false)}
      >
        <ModalModificarUsuario
          onClickClose={() => setShowModifyUserModal(false)}
          onClickModify={startModifyUser}
          user={userToModify}
        />
      </Modal>
      <ModalAsignarProductos
        key={userToModify.id + "asignarProducto"}
        clickedUser={userToModify}
        isActive={showAsignProductModal}
        setIsActive={setShowAsignProductModal}
      />
      <ModalAsignarPlantas
        key={userToModify.id + "asignarPlantas"}
        clickedUser={userToModify}
        isActive={showAsignPlantsModal}
        setIsActive={setShowAsignPlantsModal}
      />
      <ModalAsignarAlmacenes
        key={userToModify.id + "asignarAlmacen"}
        clickedUser={userToModify}
        isActive={showAssignWarehouseModal}
        setIsActive={setShowAssignWarehouseModal}
      />
    </div>
  );
}

export default FormularioModificarUsuarios;
