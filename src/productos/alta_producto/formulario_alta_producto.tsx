import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import { PlantasAPI, getPlants } from "../../apis/api_plantas";
import { Producto, insertProduct } from "../../apis/api_productos";
import DatePickerField from "../../form_components/datepicker";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import TextArea from "../../form_components/textarea";
import { appendFieldRequiredSpanish } from "../../utilities/error_messages";

function FormularioAltaProducto() {
    const [productSubmitted, setProductSubmitted] = useState(false);
    const [plantas, setPlantas] = useState<string[]>([]);
    const [date, setDate] = useState(new Date());
    const [initialValues, setIntialValues] = useState(new Producto())

    useEffect(() => {
        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
                setIntialValues(initialValues => ({ ...initialValues, planta: data[0].nombre }))
            });
    }, []);

    if (productSubmitted) {
        return (<Navigate to="/" />);
    }

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={Yup.object({
                planta: Yup.string().required(appendFieldRequiredSpanish('Planta')),
                noParte: Yup.string().required(appendFieldRequiredSpanish('No. Parte')),
                descripcion: Yup.string().required(appendFieldRequiredSpanish('Descripción')),
                maximo: Yup.string().required(appendFieldRequiredSpanish('Máximo')),
                minimo: Yup.string().required(appendFieldRequiredSpanish('Mínimo')),
                precio: Yup.string().required(appendFieldRequiredSpanish('Precio Unitario')),
                uni_medida: Yup.string().required(appendFieldRequiredSpanish('Unidad de Medida')),
                fecha_exp: Yup.string(),
                ubicacion: Yup.string().required(appendFieldRequiredSpanish('Ubicación')),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                values.fecha_exp = date.toISOString()
                insertProduct(values as Producto)
                    .then(response => {
                        if (response.ok)
                            setProductSubmitted(true)
                    })
            }}
        >
            <ShadowedForm>
                <h4 className="title is-4">Alta de Producto</h4>
                <div className="is-flex is-flex-direction-column">
                    <SelectWithLabel name="planta" label="Planta">
                        {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                    </SelectWithLabel>
                    <TextInputLabelWarning name='noParte' label='Número de parte' />
                    <div className="mt-5 mb-5">
                        <TextArea name='descripcion' placeholder='Descripción del producto' />
                    </div>
                    <TextInputLabelWarning name='maximo' label='Máximo' />
                    <TextInputLabelWarning name='minimo' label='Mínimo' />
                    <TextInputLabelWarning name='precio' label='Precio unitario' />
                    <TextInputLabelWarning name='uni_medida' label='Unidad de medida' />
                    <DatePickerField label="Fecha de Expiración" selected={date} onChange={setDate} />
                    <TextInputLabelWarning name='ubicacion' label='Ubicación almacén' />
                </div>
                <SubmitButton text='Agregar Producto' />
            </ShadowedForm>
        </Formik>
    );
}

export default FormularioAltaProducto