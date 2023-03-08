import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import { createQuote } from "../../apis/api_cotizacion";
import { getPlants, PlantasAPI } from "../../apis/api_plantas";
import "../../css/inventario.css";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextArea from "../../form_components/textarea";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { QuoteFields } from "../campos_cotizacion";
import emailQuote from "./email_cotizacion";

function FormularioCotizacion() {
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);
    const [plantas, setPlantas] = useState<string[]>([]);
    const { userKey } = useAuth();
    const [initialValues, setInitialValues] = useState({
        nombre: '',
        parte: '',
        fabricante: '',
        cant: '',
        presentacion: '',
        unidad: '',
        planta: '',
        area: '',
        additionalInfo: '',
    });

    useEffect(() => {
        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
                setInitialValues({
                    nombre: '',
                    parte: '',
                    fabricante: '',
                    cant: '',
                    presentacion: '',
                    unidad: '',
                    planta: data[0].nombre,
                    area: '',
                    additionalInfo: '',
                })
            });
    });

    if (quoteSubmitted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
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
                createQuote(values, userKey)
                    .then(response => response.json())
                    .then((data: QuoteFields) => {
                        if (data.id != null) {
                            emailQuote(data)
                                .then(() => setQuoteSubmitted(true))
                                .catch(error => console.error(error))
                        }
                    })
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
                        <SelectWithLabel name="plant" label="Planta">
                            {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                        </SelectWithLabel>
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