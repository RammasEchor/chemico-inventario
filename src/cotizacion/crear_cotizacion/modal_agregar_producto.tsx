import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ProductInQuote } from "../../apis/api_cotizacion";
import { getProducts } from "../../apis/api_productos";
import { SelectWithLabel } from "../../form_components/select_with_label";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import TextArea from "../../form_components/textarea";

interface AddProductProps {
    onClickX: () => void
    onClickCancel?: () => void
    onClickAprobar: (values: ProductInQuote) => void
}

function AddProduct(props: AddProductProps) {
    const [products, setProducts] = useState<ProductInQuote[]>([]);
    const [initialValues, setIntialValues] = useState(new ProductInQuote())

    useEffect(() => {
        getProducts()
            .then(response => response.json())
            .then((data: ProductInQuote[]) => {
                setProducts(data);
                setIntialValues(data[0]);
            });
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={Yup.object({
                descripcion: Yup.string().required(),
                noParte: Yup.string(),
                fabricante: Yup.string(),
                cant: Yup.string(),
                presentacion: Yup.string(),
                unidad: Yup.string(),
                planta: Yup.string(),
                area: Yup.string(),
                datos_adicionales: Yup.string(),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                props.onClickAprobar(values);
                props.onClickX();
            }}
        >
            <Form>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Agregar producto</p>
                        <button className="delete" aria-label="close" onClick={props.onClickX} />
                    </header>
                    <div className="modal-card-body">
                        <SelectWithLabel name="nombre" label="Nombre">
                            {products.map(product =>
                                <option value={product.descripcion} key={product.idProd}>{product.descripcion}</option>
                            )}
                        </SelectWithLabel>
                        <TextInputLabelWarning readOnly={true} name='noParte' label='Número de parte' />
                        <TextInputLabelWarning name='fabricante' label='Fabricante' />
                        <TextInputLabelWarning name='cant' label='Cantidad a solicitar' />
                        <TextInputLabelWarning name='presentacion' label='Presentación' />
                        <TextInputLabelWarning name='unidad' label='Unidad de Medida' />
                        <TextInputLabelWarning name='planta' label='Planta' />
                        <TextInputLabelWarning name='area' label='Área de Utilización' />
                        <div className="mt-5">
                            <TextArea name='additionalInfo' placeholder="Datos Adicionales" />
                        </div>
                    </div>
                    <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                        <button className="button is-success" type="submit">Agregar</button>
                        <button className="button" type="button" onClick={props.onClickCancel}>Cancelar</button>
                    </footer>
                </div>
            </Form>
        </Formik>
    );
}

export { AddProduct };

