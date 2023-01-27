import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import "../../css/inventario.css";
import Checkbox from "../../form_components/checkbox";
import WithdrawButton from "../../form_components/withdraw_button";
import TablaInventario from "../../inventario/tabla_inventario";

interface ProductAPIReturn {
    idProd: string,
    planta: string,
    noParte: string,
    descripcion: string,
    maximo: string,
    minimo: string,
    uni_medida: string,
    fecha_exp: string,
    ubicacion: string
}

function FormularioBajaProducto() {
    const [products, setProducts] = useState<ProductAPIReturn[]>([]);

    useEffect(() => {
        fetch('https://javaclusters-95554-0.cloudclusters.net/apiChemico-0.0.1-SNAPSHOT/api2/productos/')
            .then(response => response.json())
            .then((data: ProductAPIReturn[]) => {
                setProducts(data);
            });
    }, []);

    return (
        <Formik
            initialValues={{
                searchString: ''
            }}
            validationSchema={Yup.object({
                searchString: Yup.string()
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400)
            }}
        >
            <div className='box'>
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
                            <tr>
                                <td key={product.planta}>{product.planta}</td>
                                <td key={product.noParte}>{product.noParte}</td>
                                <td key={product.descripcion}>{product.descripcion}</td>
                                <td key={product.maximo}>{product.maximo}</td>
                                <td key={product.minimo}>{product.minimo}</td>
                                <td key={product.uni_medida}>{product.uni_medida}</td>
                                <td key={product.fecha_exp}>{product.fecha_exp}</td>
                                <td key={product.ubicacion}>{product.ubicacion}</td>
                            </tr>
                        );
                    })}
                </TablaInventario>
                <WithdrawButton text='Eliminar Producto' />
            </div>
        </Formik>
    );
}

export default FormularioBajaProducto