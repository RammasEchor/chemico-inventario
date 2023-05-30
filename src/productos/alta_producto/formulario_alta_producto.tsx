import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { ProductFields, insertProduct } from "../../apis/api_productos";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import TextArea from "../../form_components/textarea";
import { appendFieldRequiredSpanish } from "../../utilities/error_messages";

function FormularioAltaProducto() {
    const [productSubmitted, setProductSubmitted] = useState(false);
    const [plantas, setPlantas] = useState<string[]>([]);

    useEffect(() => {
        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
            });
    }, []);

    if (productSubmitted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            initialValues={{
                planta: 'Planta 1',
                noParte: '',
                descripcion: '',
                maximo: '',
                minimo: '',
                precio: '',
                uni_medida: '',
                fecha_exp: '',
                ubicacion: ''
            }}
            validationSchema={Yup.object({
                plant: Yup.string().required(appendFieldRequiredSpanish('Planta')),
                partNumber: Yup.string().required(appendFieldRequiredSpanish('No. Parte')),
                description: Yup.string(),
                max: Yup.string().required(appendFieldRequiredSpanish('Máximo')),
                min: Yup.string().required(appendFieldRequiredSpanish('Mínimo')),
                unitPrice: Yup.string().required(appendFieldRequiredSpanish('Precio Unitario')),
                measurementUnit: Yup.string().required(appendFieldRequiredSpanish('Unidad de Medida')),
                expirationDate: Yup.string(),
                warehouseLocation: Yup.string().required(appendFieldRequiredSpanish('Ubicación')),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                insertProduct(values as ProductFields)
                    .then(response => {
                        if (response.ok)
                            setProductSubmitted(true)
                    })
            }}
        >
            <ShadowedForm>
                <h4 className="title is-4">Alta de Producto</h4>
                <div className="is-flex is-flex-direction-column">
                    <SelectWithLabel name="plant" label="Planta">
                        {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                    </SelectWithLabel>
                    <TextInputLabelWarning name='partNumber' label='Número de parte' />
                    <div className="mt-5 mb-5">
                        <TextArea name='description' placeholder='Descripción del producto' />
                    </div>
                    <TextInputLabelWarning name='max' label='Máximo' />
                    <TextInputLabelWarning name='min' label='Mínimo' />
                    <TextInputLabelWarning name='unitPrice' label='Precio unitario' />
                    <TextInputLabelWarning name='measurementUnit' label='Unidad de medida' />
                    <TextInputLabelWarning name='expirationDate' label='Fecha de expiración' />
                    <TextInputLabelWarning name='warehouseLocation' label='Ubicación almacén' />
                </div>
                <SubmitButton text='Agregar Producto' />
            </ShadowedForm>
        </Formik>
    );
}

export default FormularioAltaProducto