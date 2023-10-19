import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Producto, getExistent, searchProducts } from "../../apis/api_productos";
import Tabla from "../../form_components/table";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";

function DisplayExistencias() {
    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        getExistent()
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <Formik
            initialValues={{
                searchString: '',
                tipo: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                searchProducts(values.searchString, values.tipo)
                    .then(res => res.json())
                    .then(data => {
                        setProducts(data)
                    })
                    .catch(error => console.log(error))
            }}
        >
            <Form>
                <div className='box'>
                    <h4 className="title is-4">Existencias</h4>
                    <div className="is-flex is-justify-content-center is-flex-wrap-wrap is-align-items-center">
                        <div className="px-2">
                            <TextInputLabelWarning name='searchString' label='Buscar por:' />
                        </div>
                        <div className="control px-6 mt-5">
                            <label className="radio">
                                <Field type="radio" name="tipo" value="1" />
                                No. Parte
                            </label>
                            <label className="radio">
                                <Field type="radio" name="tipo" value="2" />
                                Descripción
                            </label>
                        </div>
                        <div className="pb-5">
                            <button
                                className="button is-info px-6 mt-6"
                                type="submit"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                    <Tabla cols={[
                        'No. Parte',
                        'Descripción',
                        'Stock',
                    ]}>
                        {products.map(product => {
                            return (
                                <tr id={product.idProd}
                                    key={product.idProd}
                                >
                                    <td>{product.noParte}</td>
                                    <td>{product.descripcion}</td>
                                    <td>{product.stock}</td>
                                </tr>
                            );
                        })}
                    </Tabla>
                </div >
            </Form>
        </Formik>
    );
}

export { DisplayExistencias };

