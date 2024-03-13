import { Button, ErrorScreen, LoadingBar, TextInput } from "chemico-ui";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Material } from "../../../apis/api_material";
import useSolicitudesController from "../../../controllers/solicitudesController";
import { useAuth } from "../../../login/auth-provider/auth_provider";

function FormularioSolicitudMaterial() {
    const { userKey } = useAuth();
    const { getProductsSalidaQuery } = useSolicitudesController(userKey);
    const [prodSolicitar, setProdSolicitar] = useState<Material[]>([]);

    if (getProductsSalidaQuery.isLoading || getProductsSalidaQuery.isFetching) {
        return <LoadingBar />
    }

    if (getProductsSalidaQuery.isError) {
        return <ErrorScreen>{getProductsSalidaQuery.error.message}</ErrorScreen>
    }

    let total = 0;
    prodSolicitar.forEach(prod => {
        total += parseFloat(prod.precioT);
    })

    return (
        <Formik
            initialValues={{
            }}
            validationSchema={Yup.object({
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log(values);
            }}
        >
            <Form className="box">
                <h2 className="title is-3 has-text-grey-dark">Solicitud de Material</h2>
                <div className="columns">
                    <div className="column is-one-quarter">
                        <div className="sticky">
                            <TextInput label="Buscar" name="buscar" />
                            <h5 className="title is-5">Filtros de búsqueda</h5>
                            <div className="block"></div>
                            <h6 className="subtitle is-6">Nombre</h6>
                            <h6 className="subtitle is-6">No. de Parte</h6>
                            <hr></hr>
                            <h5 className="title is-5">Materiales Solicitados ({prodSolicitar.length})</h5>
                            <table className="table is-striped is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Total</th>
                                        <th></th>
                                        <th></th>
                                        <th>${total.toFixed(2)}</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {prodSolicitar.map(p => {
                                        return (
                                            <tr key={p.codigo}>
                                                <td>{p.comentarios}</td>
                                                <td>${p.precioU}</td>
                                                <td>{p.cantidad}</td>
                                                <td>${parseFloat(p.precioT).toFixed(2)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="is-flex is-justify-content-flex-end">
                                <Button disabled={!(prodSolicitar.length > 0)}>Solicitar Material</Button>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between 	">
                            {getProductsSalidaQuery.data?.map(p => {
                                return (
                                    <div key={p.idProd} className="card box" style={{ width: 300 }}>
                                        <div className="card-image columns is-vcentered is-centered">
                                            <figure className="image is-128x128 column">
                                                <img src={`https://javaclusters-95554-0.cloudclusters.net/imagesProd/${p.img}`} alt="Placeholder image" />
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <div className="content">
                                                <h6 className="title is-6" style={{ height: 30 }}>
                                                    {p.descripcion}
                                                </h6>
                                                <div className="subtitle is-6">
                                                    ${p.precio} ({p.uni_medida})
                                                </div>
                                                <span className="tag is-info is-medium">
                                                    {p.noParte}
                                                </span>
                                            </div>
                                        </div>
                                        <footer className="card-footer">
                                            {
                                                !prodSolicitar.some(e => e.id === p.idProd)
                                                    ? <a
                                                        className="card-footer-item"
                                                        onClick={() => setProdSolicitar(prodSolicitar => {
                                                            return [...prodSolicitar, {
                                                                id: p.idProd,
                                                                codigo: p.noParte,
                                                                cantidad: "1",
                                                                precioU: p.precio,
                                                                precioT: p.precio,
                                                                numPedido: "0",
                                                                folio: "0",
                                                                comentarios: p.descripcion
                                                            }]
                                                        })}
                                                    >Agregar</a>
                                                    : <>
                                                        <a className="card-footer-item" onClick={() => {
                                                            const index = prodSolicitar.findIndex(e => e.id === p.idProd);
                                                            let cant = parseInt(prodSolicitar.at(index)?.cantidad as string) - 1;
                                                            if (cant < 1) {
                                                                setProdSolicitar(prodSolicitar => prodSolicitar.filter(f => f.id !== p.idProd))
                                                            }
                                                            else {
                                                                setProdSolicitar(prodSolicitar => prodSolicitar.map(f => {
                                                                    if (f.id === p.idProd) {
                                                                        return { ...f, cantidad: `${cant}`, precioT: `${cant * parseFloat(f.precioU)}` }
                                                                    }
                                                                    else {
                                                                        return f
                                                                    }
                                                                }))
                                                            }

                                                        }}>-</a>
                                                        <a className="card-footer-item">{prodSolicitar.find(e => e.id === p.idProd)?.cantidad}</a>
                                                        <a className="card-footer-item" onClick={() => {
                                                            const index = prodSolicitar.findIndex(e => e.id === p.idProd);
                                                            let cant = parseInt(prodSolicitar.at(index)?.cantidad as string) + 1;
                                                            setProdSolicitar(prodSolicitar => prodSolicitar.map(f => {
                                                                if (f.id === p.idProd) {
                                                                    return { ...f, cantidad: `${cant}`, precioT: `${cant * parseInt(f.precioU)}` }
                                                                }
                                                                else {
                                                                    return f
                                                                }
                                                            }))
                                                        }}>+</a>
                                                    </>
                                            }
                                        </footer>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Form>
        </Formik >
    );
}

export default FormularioSolicitudMaterial;