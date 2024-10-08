import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { ProductInQuote, createMasterQuote, createQuote, getNextQuote } from "../../apis/api_cotizacion";
import "../../css/inventario.css";
import { Modal } from "../../form_components/modal";
import SubmitButton from "../../form_components/submit_button";
import Tabla from "../../form_components/table";
import TextArea from "../../form_components/textarea";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { AddProduct } from "./modal_agregar_producto";
import ModalModificarProductoCotizacion from "./modal_modificar_producto_cot";

function FormularioCotizacion() {
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);
    const { userKey } = useAuth();
    const [showDetail, setShowDetail] = useState(false);
    const [products, setProducts] = useState<ProductInQuote[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>();
    const [folio, setFolio] = useState("Cargando...");
    const [productIdtoModify, setProductIdtoModify] = useState<string>("");
    const [productToModify, setProductToModify] = useState({} as ProductInQuote);
    const [showModifyProductModal, setShowModifyProductModal] = useState(false);
    const [canCreateQuote, setCanCreateQuote] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getNextQuote()
            .then(response => response.text())
            .then(nextQuoteId => setFolio(nextQuoteId))
            .catch(error => console.log(error))
    }, []);

    if (quoteSubmitted) {
        navigate(0);
    }

    function AgregarProducto(product: ProductInQuote) {
        setProducts(products => [
            ...products,
            product
        ]);
    }

    useEffect(() => {
        if (products.length > 0) {
            setCanCreateQuote(true);
        }
        else {
            setCanCreateQuote(false);
        }
    }, [products])

    function ClearProducts() {
        setProducts([]);
    }

    function DeleteProduct(noParte: string) {
        setProducts(products => products.filter(p => p.noParte !== noParte))
    }

    function ModifyProduct(modified: ProductInQuote) {
        const indexToModify = products.findIndex(p => p.noParte === modified.noParte)
        setProducts(products => {
            products[indexToModify] = modified
            return products
        })
        setShowModifyProductModal(false)
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
                    .then(data => createQuote(products, data, userKey))
                    .then(() => createMasterQuote(values.masterDesc, userKey))
                    .then(response => response.text())
                    .then(data => {
                        if (data)
                            setQuoteSubmitted(true)
                    })
                    .catch(error => console.error(error))
            }}
        >
            {({ errors, touched, isValid }) => (
                <>
                    <div className="columns is-centered p-3">
                        <Form className="is-flex is-flex-direction-column box column is-11">
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
                                'Acción'
                            ]}>
                                {products.map(product => {
                                    return (
                                        <tr key={product.noParte}
                                            onClick={() => setSelectedProduct(product.noParte)}
                                            className={selectedProduct === product.noParte ? 'is-selected' : ''}
                                        >
                                            <td>{product.descripcion}</td>
                                            <td>{product.noParte}</td>
                                            <td>{product.fabricante}</td>
                                            <td>{product.cant}</td>
                                            <td>{product.presentacion}</td>
                                            <td>{product.uni_medida}</td>
                                            <td>{product.planta}</td>
                                            <td>{product.area}</td>
                                            <div className="buttons are-small mt-1">
                                                <button className="button is-warning" onClick={() => {
                                                    setProductIdtoModify(product.noParte)
                                                    setProductToModify(product)
                                                    setShowModifyProductModal(true)
                                                }}>
                                                    Modificar
                                                </button>
                                                <button className="button is-danger" onClick={() => DeleteProduct(product.noParte)}>
                                                    Eliminar
                                                </button>
                                            </div>
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
                                    >Eliminar todos los Productos</button>
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
                            <SubmitButton text={`Crear Cotización: ${products.length} Producto(s)`} disabled={!(canCreateQuote && isValid)}/>
                        </Form>
                    </div>
                    <Modal showModal={showDetail} onClick={() => setShowDetail(false)}>
                        <AddProduct
                            onClickX={() => setShowDetail(false)}
                            onClickCancel={() => setShowDetail(false)}
                            onClickAprobar={AgregarProducto}
                        />
                    </Modal>
                    <Modal key={productIdtoModify} showModal={showModifyProductModal} onClick={() => setShowModifyProductModal(false)}>
                        <ModalModificarProductoCotizacion
                            onClickClose={() => setShowModifyProductModal(false)}
                            onClickModify={ModifyProduct}
                            product={productToModify}
                        />
                    </Modal >
                </>
            )}

        </Formik >
    );
}

export default FormularioCotizacion