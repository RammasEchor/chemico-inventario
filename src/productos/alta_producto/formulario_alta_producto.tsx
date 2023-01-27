import { Formik } from "formik";
import * as Yup from "yup";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextArea from "../../form_components/textarea";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";


function FormularioAltaProducto() {
    return (
        <Formik
            initialValues={{
                plant: '',
                partNumber: '',
                description: '',
                max: '',
                min: '',
                unitPrice: '',
                measurementUnit: '',
                expirationDate: '',
                warehouseLocation: ''
            }}
            validationSchema={Yup.object({
                plant: Yup.string(),
                partNumber: Yup.string(),
                description: Yup.string(),
                max: Yup.string(),
                min: Yup.string(),
                unitPrice: Yup.string(),
                measurementUnit: Yup.string(),
                expirationDate: Yup.string(),
                warehouseLocation: Yup.string(),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400)
            }}
        >
            <ShadowedForm>
                <h4 className="title is-4">Alta de Producto</h4>
                <div className="is-flex is-flex-direction-column">
                    <TextInputLabelWarning name='plant' label='Planta' />
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
                <SubmitButton text='Agregar Producto'/>
            </ShadowedForm>
        </Formik>
    );
}

export default FormularioAltaProducto