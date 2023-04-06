import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { getPlants, PlantasAPI } from "../../apis/api_plantas";
import { SelectWithLabel } from "../../form_components/select_with_label";
import TextArea from "../../form_components/textarea";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { QuoteFields } from "../campos_cotizacion";

interface AddProductProps {
    onClickX: () => void
    onClickCancel?: () => void
    onClickAprobar: (values: QuoteFields) => void
}

function AddProduct(props: AddProductProps) {
    const [plantas, setPlantas] = useState<string[]>([]);
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
    }, []);

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
                        <TextInputLabelWarning name='nombre' label='Nombre de Producto' />
                        <TextInputLabelWarning name='parte' label='Número de parte' />
                        <TextInputLabelWarning name='fabricante' label='Fabricante' />
                        <TextInputLabelWarning name='cant' label='Cantidad a solicitar' />
                        <TextInputLabelWarning name='presentacion' label='Presentación' />
                        <TextInputLabelWarning name='unidad' label='Unidad de Medida' />
                        <SelectWithLabel name="planta" label="Planta">
                            {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                        </SelectWithLabel>
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

