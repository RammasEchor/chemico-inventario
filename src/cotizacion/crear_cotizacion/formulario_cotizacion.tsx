import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import { ProductInQuote, createMasterQuote, createQuote, getNextQuote } from "../../apis/api_cotizacion";
import "../../css/inventario.css";
import { Modal } from "../../form_components/modal";
import SubmitButton from "../../form_components/submit_button";
import Tabla from "../../form_components/table";
import TextArea from "../../form_components/textarea";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { AddProduct } from "./modal_agregar_producto";

function FormularioCotizacion() {
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);
    const { userKey } = useAuth();
    const [showDetail, setShowDetail] = useState(false);
    const [products, setProducts] = useState<ProductInQuote[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>();
    const [folio, setFolio] = useState("Cargando...");

    useEffect(() => {
        getNextQuote()
            .then(response => response.text())
            .then(nextQuoteId => setFolio(nextQuoteId))
            .catch(error => console.log(error))
    }, []);

    if (quoteSubmitted) {
        return (<Navigate to="/" />);
    }

    function AgregarProducto(product: ProductInQuote) {
        setProducts(products => [
            ...products,
            product
        ]);
    }

    function ClearProducts() {
        setProducts([]);
    }

    return (
        <Formik
            initialValues={{
                masterDesc: ''
            }}
            validationSchema={Yup.object({
                masterDesc: Yup.string()
                    .required('La descripción es requerida!')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                getNextQuote()
                    .then(response => response.text())
                    .then(data => createQuote(products, data))
                    .then(() => createMasterQuote(values.masterDesc, userKey))
                    .then(response => response.text())
                    .then(data => {
                        if (data)
                            setQuoteSubmitted(true)
                    })
                    .catch(error => console.error(error))
            }}
        >
            {({ errors, touched }) => (
                <>
                    <div className="columns is-centered p-4">
                        <Form className="is-flex is-flex-direction-column box column is-10">
                            <h4 className="title is-4">Crear Cotización</h4>
                            <h5 className="subtitle is-5">Folio: {folio}</h5>
                            <Tabla cols={[
                                'Nombre',
                                'Parte',
                                'Fabricante',
                                'Cantidad',
                                'Presentación',
                                'Unidad',
                                'Planta',
                                'Área',
                            ]}>
                                {products.map(product => {
                                    return (
                                        <tr id={product.idProd}
                                            key={product.idProd}
                                            onClick={() => setSelectedProduct(product.descripcion)}
                                            className={selectedProduct === product.descripcion ? 'is-selected' : ''}
                                        >
                                            <td>{product.descripcion}</td>
                                            <td>{product.noParte}</td>
                                            <td>{product.fabricante}</td>
                                            <td>{product.cant}</td>
                                            <td>{product.presentacion}</td>
                                            <td>{product.unidad}</td>
                                            <td>{product.planta}</td>
                                            <td>{product.area}</td>
                                        </tr>
                                    );
                                })}
                            </Tabla>
                            <div className="columns">
                                <div className="column" />
                                <div className="column is-flex is-3">
                                    <button
                                        className="is-flex-grow-1 button is-danger is-outlined"
                                        type="button"
                                        onClick={() => ClearProducts()}
                                    >Cancelar</button>
                                </div>
                                <div className="column is-flex is-3">
                                    <button
                                        className="is-flex-grow-1 button is-primary"
                                        type="button"
                                        onClick={() => setShowDetail(true)}
                                    >Agregar Producto</button>
                                </div>
                            </div>
                            <div className="mt-5">
                                <TextArea name='masterDesc' placeholder="Datos Adicionales" />
                            </div>
                            {touched.masterDesc && errors.masterDesc &&
                                <div className="has-text-danger ml-1 mt-1">
                                    {errors.masterDesc}
                                </div>
                            }
                            <SubmitButton text="Crear Cotización" />
                        </Form>
                    </div>
                    <Modal showModal={showDetail} onClick={() => setShowDetail(false)}>
                        <AddProduct
                            onClickX={() => setShowDetail(false)}
                            onClickCancel={() => setShowDetail(false)}
                            onClickAprobar={AgregarProducto}
                        />
                    </Modal>
                </>
            )}
        </Formik >
    );
}

export default FormularioCotizacion