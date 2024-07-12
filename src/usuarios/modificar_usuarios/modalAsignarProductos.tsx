import { CellButton, LoadingBar, TextInput } from "chemico-ui"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useProductsForAssignment } from "../../apis/api_cotizacion"
import { Producto } from "../../apis/api_productos"
import { User, useAssignProductsToUser } from "../../apis/api_usuarios"
import Table from "../../form_components/table"

interface Props {
    clickedUser: User
    isActive: boolean
    setIsActive: (isActive: boolean) => void
}

function ModalAsignarProductos(props: Props) {
    const getProductsForAssigmentQuery = useProductsForAssignment(props.clickedUser.cveUsuario);
    const assignProductsMutation = useAssignProductsToUser();
    const [productsToAssign, setProductsToAssign] = useState<Producto[]>([]);

    let modalClassName = "modal"
    if (props.isActive) {
        modalClassName += " is-active"
    }

    let successButtonClassName = "button is-success"
    if (assignProductsMutation.isPending) {
        successButtonClassName += " is-loading"
    }

    return (
        <Formik
            initialValues={{
                searchString: ""
            }}
            onSubmit={() => { }}
        >
            {formik =>
                <Form>
                    <div className={modalClassName}>
                        <div className="modal-background" />
                        <div className="modal-card" style={{ width: "75%" }}>
                            <header className="modal-card-head">
                                <p className="modal-card-title">{props.clickedUser.cveUsuario}</p>
                                <button className="delete" aria-label="close" type="button" onClick={() => props.setIsActive(false)} />
                            </header>
                            <section className="modal-card-body">
                                <TextInput
                                    label="Buscar"
                                    name="searchString"
                                />
                                {
                                    getProductsForAssigmentQuery.isLoading || getProductsForAssigmentQuery.isFetching ?
                                        <LoadingBar />
                                        :
                                        <div className="table-container">
                                            <Table
                                                cols={[
                                                    "Código de Producto",
                                                    "Nombre de Producto",
                                                    "Acción"
                                                ]}
                                            >
                                                {getProductsForAssigmentQuery.data?.filter(p => {
                                                    const searchString = formik.values.searchString;
                                                    if (searchString === "")
                                                        return true;

                                                    if (p.descripcion.toLowerCase().includes(searchString.toLowerCase()) || p.noParte.includes(searchString)) {
                                                        return true;
                                                    }

                                                    return false;
                                                }).map(p => {
                                                    const assigned = productsToAssign.includes(p);

                                                    return (
                                                        <tr key={p.noParte + p.descripcion} className={assigned ? "is-selected" : ""}>
                                                            <td>{p.noParte}</td>
                                                            <td>{p.descripcion}</td>
                                                            <td className="is-flex is-justify-content-center">
                                                                {
                                                                    assigned ?
                                                                        <CellButton
                                                                            className="button is-warning is-light"
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setProductsToAssign(productsToAssign => {
                                                                                    return productsToAssign.filter(pr => pr !== p);
                                                                                });
                                                                            }}
                                                                        >
                                                                            Eliminar
                                                                        </CellButton>
                                                                        :
                                                                        <CellButton
                                                                            className="button is-info is-light"
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setProductsToAssign(productsToAssign => {
                                                                                    return [...productsToAssign, p]
                                                                                });
                                                                            }}
                                                                        >
                                                                            Asignar
                                                                        </CellButton>
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </Table>
                                        </div>
                                }
                            </section>
                            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                                <button className="button" type="button" onClick={() => props.setIsActive(false)}>Cancelar</button>
                                <button
                                    className={successButtonClassName}
                                    disabled={!(productsToAssign.length > 0)}
                                    type="button"
                                    onClick={() => assignProductsMutation.mutate({ id: props.clickedUser.id, products: productsToAssign })}
                                >
                                    Asignar Productos
                                </button>
                            </footer>
                        </div >
                    </div >
                </Form>
            }
        </Formik>
    );
}

export default ModalAsignarProductos;
