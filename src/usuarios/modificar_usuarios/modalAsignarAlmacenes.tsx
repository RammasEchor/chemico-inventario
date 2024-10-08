import { CellButton, TextInput } from "chemico-ui";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  getWarehousesForUser,
  useAssignWarehouseToUser,
  User
} from "../../apis/api_usuarios";
import Table from "../../form_components/table";

interface Props {
  clickedUser: User;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

function ModalAsignarAlmacenes(props: Props) {
  const [almacenes, setAlmacenes] = useState<string[]>([]);
  const assignWarehouseMutation = useAssignWarehouseToUser();
  const [almacenesToAssign, setAlmacenesToAssign] = useState<string[]>([]);

  useEffect(() => {
    if (props.clickedUser.planta) {
      getWarehousesForUser()
        .then((res) => res.json())
        .then((data) => {
          setAlmacenes(data);
        })
        .catch((error) => console.log(error));
    }
  }, [props.clickedUser.planta]);

  let modalClassName = "modal";
  if (props.isActive) {
    modalClassName += " is-active";
  }

  let successButtonClassName = "button is-success";
  if (assignWarehouseMutation.isPending) {
    successButtonClassName += " is-loading";
  }

  return (
    <Formik
      initialValues={{
        searchString: "",
      }}
      onSubmit={() => {}}
    >
      {(formik) => (
        <Form>
          <div className={modalClassName}>
            <div className="modal-background" />
            <div className="modal-card" style={{ width: "75%" }}>
              <header className="modal-card-head">
                <p className="modal-card-title">
                  {props.clickedUser.cveUsuario}
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  type="button"
                  onClick={() => props.setIsActive(false)}
                />
              </header>
              <section className="modal-card-body">
                <TextInput label="Buscar" name="searchString" />

                <div className="table-container">
                  <Table cols={["Almacén", "Acción"]}>
                    {almacenes
                      ?.filter((p) => {
                        const searchString = formik.values.searchString;
                        if (searchString === "") return true;

                        if (
                          p.toLowerCase().includes(searchString.toLowerCase())
                        ) {
                          return true;
                        }

                        return false;
                      })
                      .map((p) => {
                        const assigned = almacenesToAssign.includes(p);

                        return (
                          <tr key={p} className={assigned ? "is-selected" : ""}>
                            <td>{p}</td>
                            <td className="is-flex is-justify-content-center">
                              {assigned ? (
                                <CellButton
                                  className="button is-warning is-light"
                                  type="button"
                                  onClick={() => {
                                    setAlmacenesToAssign((plantsToAssign) => {
                                      return plantsToAssign.filter(
                                        (pr) => pr !== p
                                      );
                                    });
                                  }}
                                >
                                  Eliminar
                                </CellButton>
                              ) : (
                                <CellButton
                                  className="button is-info is-light"
                                  type="button"
                                  onClick={() => {
                                    setAlmacenesToAssign((plantsToAssign) => {
                                      return [...plantsToAssign, p];
                                    });
                                  }}
                                >
                                  Asignar
                                </CellButton>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </Table>
                </div>
              </section>
              <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                <button
                  className="button"
                  type="button"
                  onClick={() => props.setIsActive(false)}
                >
                  Cancelar
                </button>
                <button
                  className={successButtonClassName}
                  disabled={!(almacenesToAssign.length > 0)}
                  type="button"
                  onClick={() =>
                    assignWarehouseMutation.mutate({
                      idUsuario: props.clickedUser.id,
                      almacenes: almacenesToAssign,
                    })
                  }
                >
                  Asignar Almacenes
                </button>
              </footer>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ModalAsignarAlmacenes;
