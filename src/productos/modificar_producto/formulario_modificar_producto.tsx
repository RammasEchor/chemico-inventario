import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Producto, getProducts, modifyProduct } from "../../apis/api_productos";
import { Modal } from "../../form_components/modal";
import Tabla from "../../form_components/table";
import { dateParser } from "../../utilities/date_parser";
import ModalModificarProducto from "./modal_modificar_producto";

function FormularioModificarProducto() {
    const [products, setProducts] = useState<Producto[]>([]);
    const [productIdtoModify, setProductIdtoModify] = useState<string>("");
    const [productToModify, setProductToModify] = useState(new Producto());
    const [showModifyProductModal, setShowModifyProductModal] = useState(false);
    const [productWasModified, setProductWasModified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts()
            .then(response => response.json())
            .then((data: Producto[]) => {
                setProducts(data);
            });
    }, []);

    function startModifyProduct(product: Producto) {
        modifyProduct(product)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProductWasModified(true)
            })
            .catch(error => console.log(error))
    }

    if (productWasModified) {
        navigate(0);
    }

    return (
        <div className='box'>
            <h4 className="title is-4">Modificar Producto</h4>
            <Tabla cols={[
                'Planta',
                'No. Parte',
                'Descripción',
                'Máximo',
                'Mínimo',
                'Precio unitario',
                'Unidad de medida',
                'Fecha de expiración',
                'Ubicación almacén',
                'Acción'
            ]}>
                {products.map(product => {
                    return (
                        <tr id={product.idProd}
                            key={product.idProd}
                            onClick={() => setProductIdtoModify(product.idProd)}
                            className={productIdtoModify === product.idProd ? 'is-selected' : ''}
                        >
                            <td>{product.planta}</td>
                            <td>{product.noParte}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.maximo}</td>
                            <td>{product.minimo}</td>
                            <td>{product.precio}</td>
                            <td>{product.uni_medida}</td>
                            <td>{dateParser(product.fecha_exp)}</td>
                            <td>{product.ubicacion}</td>
                            <td>
                                <button className={`
                                    button 
                                    is-normal 
                                    is-info 
                                    ${productIdtoModify === product.idProd ? 'is-inverted' : 'is-outlined'}`}
                                    onClick={() => {
                                        setProductToModify(product)
                                        setShowModifyProductModal(true)
                                    }}
                                >Modificar</button>
                            </td>
                        </tr>
                    );
                })}
            </Tabla>
            <Modal key={productIdtoModify} showModal={showModifyProductModal} onClick={() => setShowModifyProductModal(false)}>
                <ModalModificarProducto
                    onClickClose={() => setShowModifyProductModal(false)}
                    onClickModify={startModifyProduct}
                    product={productToModify}
                />
            </Modal >
        </div >
    );
}

export default FormularioModificarProducto