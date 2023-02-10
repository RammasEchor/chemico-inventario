import { Formik } from "formik";
import { useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import "../../css/inventario.css";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextArea from "../../form_components/textarea";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { createQuote } from "../api_cotizacion";
import emailQuote from "./email_cotizacion";

function FormularioCotizacion() {
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);
    const { userKey } = useAuth();

    if (quoteSubmitted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            initialValues={{
                nombre: '',
                parte: '',
                fabricante: '',
                cant: '',
                presentacion: '',
                unidad: '',
                planta: '',
                area: '',
                additionalInfo: '',
            }}
            validationSchema={Yup.object({
                nombre: Yup.string().required(),
                parte: Yup.string(),
                fabricante: Yup.string(),
                cant: Yup.string(),
                presentacion: Yup.string(),
                unidad: Yup.string(),
                planta: Yup.string(),
                area: Yup.string(),
                additionalInfo: Yup.string(),
            })}
            onSubmit={(values, { setSubmitting }) => {
                console.log(process.env.NODE_ENV);
                setSubmitting(false);
                emailQuote(values)
                    .then(() => createQuote(values, userKey))
                    .then(() => setQuoteSubmitted(true))
                    .catch(error => console.error(error))
            }}
        >
            <ShadowedForm>
                <h4 className="title is-4">Crear Cotización</h4>
                <div className="is-flex is-flex-direction-column">
                    <div>
                        <TextInputLabelWarning name='nombre' label='Nombre de Producto' />
                        <TextInputLabelWarning name='parte' label='Número de parte' />
                        <TextInputLabelWarning name='fabricante' label='Fabricante' />
                        <TextInputLabelWarning name='cant' label='Cantidad a solicitar' />
                        <TextInputLabelWarning name='presentacion' label='Presentación' />
                        <TextInputLabelWarning name='unidad' label='Unidad de Medida' />
                        <TextInputLabelWarning name='planta' label='Planta de Origen' />
                        <TextInputLabelWarning name='area' label='Área de Utilización' />
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