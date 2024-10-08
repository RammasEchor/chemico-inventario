import { CellButton, TextInput } from "chemico-ui";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getPlants, PlantasAPI } from "../../apis/api_plantas";
import { useAssignPlantsToUser, User } from "../../apis/api_usuarios";
import Table from "../../form_components/table";

interface Props {
  clickedUser: User;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

function ModalAsignarPlantas(props: Props) {
  const [plantas, setPlantas] = useState<PlantasAPI[]>([]);
  const assignPlantsMutation = useAssignPlantsToUser();
  const [plantsToAssign, setPlantsToAssign] = useState<PlantasAPI[]>([]);

  useEffect(() => {
    getPlants()
      .then((response) => response.json())
      .then((data: PlantasAPI[]) => {
        setPlantas(data.map((planta) => planta));
      });
  }, []);

  let modalClassName = "modal";
  if (props.isActive) {
    modalClassName += " is-active";
  }

  let successButtonClassName = "button is-success";
  if (assignPlantsMutation.isPending) {
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
                  <Table
                    cols={[
                      "Id",
                      "Planta",
                      "Acción",
                    ]}
                  >
                    {plantas
                      ?.filter((p) => {
                        const searchString = formik.values.searchString;
                        if (searchString === "") return true;

                        if (
                          p.nombre
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ) {
                          return true;
                        }

                        return false;
                      })
                      .map((p) => {
                        const assigned = plantsToAssign.includes(p);

                        return (
                          <tr
                            key={p.id + p.nombre}
                            className={assigned ? "is-selected" : ""}
                          >
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td className="is-flex is-justify-content-center">
                              {assigned ? (
                                <CellButton
                                  className="button is-warning is-light"
                                  type="button"
                                  onClick={() => {
                                    setPlantsToAssign((plantsToAssign) => {
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
                                    setPlantsToAssign((plantsToAssign) => {
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
                  disabled={!(plantsToAssign.length > 0)}
                  type="button"
                  onClick={() =>
                    assignPlantsMutation.mutate({
                      cveUsuario: props.clickedUser.id,
                      plantas: plantsToAssign,
                    })
                  }
                >
                  Asignar Plantas
                </button>
              </footer>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ModalAsignarPlantas;
