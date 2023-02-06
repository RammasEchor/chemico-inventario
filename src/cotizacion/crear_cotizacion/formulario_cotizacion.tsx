import { Formik } from "formik";
import { useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import "../../css/inventario.css";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextArea from "../../form_components/textarea";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { createQuote } from "../api_cotizacion";
import emailQuote from "./email_cotizacion";

function FormularioCotizacion() {
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);

    if (quoteSubmitted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            initialValues={{
                productName: '',
                partNumber: '',
                maker: '',
                howMany: '',
                type: '',
                metricUnit: '',
                origin: '',
                useArea: '',
                additionalInfo: '',
            }}
            validationSchema={Yup.object({
                productName: Yup.string()
                    .required(),
                partNumber: Yup.string(),
                maker: Yup.string(),
                howMany: Yup.string(),
                type: Yup.string(),
                metricUnit: Yup.string(),
                origin: Yup.string(),
                useArea: Yup.string(),
                additionalInfo: Yup.string(),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                emailQuote(values)
                    .then(() => createQuote(values))
                    .then(() => setQuoteSubmitted(true))
                    .catch(error => console.error(error))
            }}
        >
            <ShadowedForm>
                <h4 className="title is-4">Crear Cotización</h4>
                <div className="is-flex is-flex-direction-column">
                    <div>
                        <TextInputLabelWarning name='productName' label='Nombre de Producto' />
                        <TextInputLabelWarning name='partNumber' label='Número de parte' />
                        <TextInputLabelWarning name='maker' label='Fabricante' />
                        <TextInputLabelWarning name='howMany' label='Cantidad a solicitar' />
                        <TextInputLabelWarning name='type' label='Presentación' />
                        <TextInputLabelWarning name='metricUnit' label='Unidad de Medida' />
                        <TextInputLabelWarning name='origin' label='Planta de Origen' />
                        <TextInputLabelWarning name='useArea' label='Área de Utilización' />
                        <div className="mt-5">
                            <TextArea name='additionalInfo' placeholder="Datos Adicionales" />
                        </div>
                    </div>
                    {/* <div className="mt-5">
                            <FileForm />
                        </div> */}
                </div>
                <SubmitButton text="Crear Cotización" />
            </ShadowedForm>
        </Formik >
    );
}

export default FormularioCotizacion