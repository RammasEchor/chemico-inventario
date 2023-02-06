import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import "../../css/inventario.css";
import Checkbox from "../../form_components/checkbox";
import WithdrawButton from "../../form_components/withdraw_button";
import TablaInventario from "../../inventario/tabla_inventario";
import { deleteProduct, getProducts } from "../api_productos";

interface ProductFields {
    idProd: string,
    planta: string,
    noParte: string,
    descripcion: string,
    maximo: string,
    minimo: string,
    precio: string,
    uni_medida: string,
    fecha_exp: string,
    ubicacion: string
}

function FormularioBajaProducto() {
    const [products, setProducts] = useState<ProductFields[]>([]);
    const [prodIdToDelete, setProdIdToDelete] = useState<string>();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        getProducts()
            .then(response => response.json())
            .then((data: ProductFields[]) => {
                setProducts(data);
            });
    }, []);

    if (deleted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            initialValues={{
                searchString: ''
            }}
            validationSchema={Yup.object({
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                deleteProduct(prodIdToDelete)
                    .then(response => {
                        if (response.ok)
                            setDeleted(true);
                    })
                    .catch(error => console.error(error))
            }}
        >
            <Form className='box'>
                <h4 className="title is-4">Baja de Producto</h4>
                <div className='columns p-3 is-vcentered is-desktop'>
                    <input
                        className={`
                                input is-info
                                column
                        `}
                        type="text"
                        placeholder="Palabra o parte de palabra a buscar"
                        name='searchString'
                    />
                    <div className="column is-narrow">
                        <h6 className={`subtitle is-6`}>Dentro de:</h6>
                    </div>
                    <div className="column is-narrow is-gapless">
                        <div className="columns is-tablet">
                            <div className="column is-narrow-desktop is-flex is-flex-direction-column is-justify-content-space-between">
                                <Checkbox>Planta</Checkbox>
                                <Checkbox>No. Parte</Checkbox>
                                <Checkbox>Descripción</Checkbox>
                            </div>
                            <div className="column is-narrow-desktop is-flex is-flex-direction-column is-justify-content-space-between">
                                <Checkbox>Máximo</Checkbox>
                                <Checkbox>Mínimo</Checkbox>
                                <Checkbox>Precio unitario</Checkbox>
                            </div>
                            <div className="column is-narrow-desktop is-flex is-flex-direction-column is-justify-content-space-between">
                                <Checkbox>Unidad de medida</Checkbox>
                                <Checkbox>Fecha de expiración</Checkbox>
                                <Checkbox>Ubicación almacén</Checkbox>
                            </div>
                        </div>
                    </div>
                    <div className="column is-narrow-desktop">
                        <button className="button is-info is-medium">Buscar</button>
                    </div>
                </div>
                <TablaInventario>
                    {products.map(product => {
                        return (
                            <tr id={product.idProd}
                                key={product.idProd}
                                onClick={() => setProdIdToDelete(product.idProd)}
                                className={prodIdToDelete === product.idProd ? 'is-selected' : ''}
                            >
                                <td key={product.planta}>{product.planta}</td>
                                <td key={product.noParte}>{product.noParte}</td>
                                <td key={product.descripcion}>{product.descripcion}</td>
                                <td key={product.maximo}>{product.maximo}</td>
                                <td key={product.minimo}>{product.minimo}</td>
                                <td key={product.precio}>{product.precio}</td>
                                <td key={product.uni_medida}>{product.uni_medida}</td>
                                <td key={product.fecha_exp}>{product.fecha_exp}</td>
                                <td key={product.ubicacion}>{product.ubicacion}</td>
                            </tr>
                        );
                    })}
                </TablaInventario>
                <WithdrawButton text='Eliminar Producto' />
            </Form>
        </Formik>
    );
}

export default FormularioBajaProducto