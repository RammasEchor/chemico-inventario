import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { Material, getNextSalida, postDetalleSalida, postMasterDetalleSalida } from "../../apis/api_material";
import { Modal } from "../../form_components/modal";
import SubmitButton from "../../form_components/submit_button";
import Tabla from "../../form_components/table";
import { useAuth } from "../../login/auth-provider/auth_provider";
import AgregarMaterial from "./modal_agregar_material";
import ModalModificarProductoSolicitud from "./modal_modifical_material";

function FormularioSolicitudMaterial() {
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showModifyProductModal, setShowModifyProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string>();
    const [productIdtoModify, setProductIdtoModify] = useState<string>("");
    const [productToModify, setProductToModify] = useState({} as Material);
    const [materiales, setMateriales] = useState<Material[]>([]);
    const [folio, setFolio] = useState("");

    const { userKey } = useAuth();
    const navigate = useNavigate();

    function addMaterial(material: Material) {
        setShowAddProductModal(false);
        setMateriales(materiales => { return [...materiales, material] });
    }

    function DeleteProduct(noParte: string) {
        setMateriales(materiales => materiales.filter(m => m.codigo !== noParte))
    }

    function ModifyProduct(modified: Material) {
        const indexToModify = materiales.findIndex(m => m.codigo === modified.codigo)
        setMateriales(materiales => {
            materiales[indexToModify] = modified
            return materiales
        })
        setShowModifyProductModal(false)
    }

    useEffect(() => {
        getNextSalida()
            .then(res => res.text())
            .then(data => {
                setFolio(data)
            })
    }, []);

    return (
        <Formik
            initialValues={{
            }}
            validationSchema={Yup.object({
            })}
            onSubmit={(_, { setSubmitting }) => {
                setSubmitting(false);
                postDetalleSalida(materiales)
                    .then(() => {
                        postMasterDetalleSalida(folio, userKey, "Test")
                            .then(() => navigate(0))
                    })
            }}
        >
            <div className="columns is-centered p-3">
                <Form className="is-flex is-flex-direction-column box column is-11">
                    <h4 className="title is-4">Solicitud de Material</h4>
                    <h5 className="subtitle is-5">Folio: {folio}</h5>
                    <Tabla cols={[
                        'Código del Producto',
                        'Cantidad',
                        'Precio Unitario',
                        'Precio Total',
                        'Número de Pedido',
                        'Acción'
                    ]}>
                        {materiales.map(m => {
                            return (
                                <tr key={m.codigo}
                                    onClick={() => setSelectedProduct(m.codigo)}
                                    className={selectedProduct === m.codigo ? 'is-selected' : ''}
                                >
                                    <td>{m.codigo}</td>
                                    <td>{m.cantidad}</td>
                                    <td>{m.precioU}</td>
                                    <td>{m.precioT}</td>
                                    <td>{m.numPedido}</td>
                                    <td>
                                        <div className="buttons are-small mt-1">
                                            <button className="button is-warning" onClick={() => {
                                                setProductIdtoModify(m.codigo)
                                                setProductToModify(m)
                                                setShowModifyProductModal(true)
                                            }}>
                                                Modificar
                                            </button>
                                            <button className="button is-danger" onClick={() => DeleteProduct(m.codigo)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
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
                                onClick={() => setMateriales([])}
                            >Eliminar todos los Productos</button>
                        </div>
                        <div className="column is-flex is-3">
                            <button
                                className="is-flex-grow-1 button is-primary"
                                type="button"
                                onClick={() => setShowAddProductModal(true)}
                            >Agregar Producto</button>
                        </div>
                    </div>
                    {/* <div className="mt-5">
                        <TextArea name='masterDesc' placeholder="Datos Adicionales" />
                        <ErrorMessage name="masterDesc">
                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>
                    </div> */}
                    <SubmitButton text={`Crear solicitud`} />
                    <Modal
                        showModal={showAddProductModal}
                        onClick={() => { setShowAddProductModal(false) }}
                    >
                        <AgregarMaterial
                            onClickCancelar={() => setShowAddProductModal(false)}
                            onClickAceptar={addMaterial}
                            folio={folio}
                        />
                    </Modal>
                    <Modal key={productIdtoModify} showModal={showModifyProductModal} onClick={() => setShowModifyProductModal(false)}>
                        <ModalModificarProductoSolicitud
                            onClickClose={() => setShowModifyProductModal(false)}
                            onClickModify={ModifyProduct}
                            product={productToModify}
                        />
                    </Modal >
                </Form>
            </div>
        </Formik >
    );
}

export default FormularioSolicitudMaterial;