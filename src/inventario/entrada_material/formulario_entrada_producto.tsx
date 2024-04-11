import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import * as Yup from "yup";
import { createMaterial } from "../../apis/api_inventario";
import { getPlants, PlantasAPI } from "../../apis/api_plantas";
import { SelectWithLabel } from "../../form_components/select_with_label";
import ShadowedForm from "../../form_components/shadowed_form";
import SubmitButton from "../../form_components/submit_button";
import TextArea from "../../form_components/textarea";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { TextInputNoMod } from "../../form_components/text_input_nomod";
import { useAuth } from "../../login/auth-provider/auth_provider";

function FormularioEntradaMaterial() {
    const { userKey } = useAuth();
    const [plantas, setPlantas] = useState<string[]>([]);
    const [materialSubmitted, setMaterialSubmitted] = useState(false);

    useEffect(() => {
        getPlants()
            .then(response => response.json())
            .then((data: PlantasAPI[]) => {
                setPlantas(data.map(planta => planta.nombre));
            });
    }, []);

    if (materialSubmitted) {
        return (<Navigate to="/" />);
    }

    const hoy = (new Date()).toISOString().slice(0, 10);

    return (
        <Formik
            initialValues={{
                nombreProd: '',
                codigoProd: '',
                fechaEntrada: hoy,
                usuarioRecibio: userKey as string,
                cantidad: '',
                observaciones: '',
                planta: 'Planta 1'
            }}
            validationSchema={Yup.object({
                nombreProd: Yup.string().required(),
                codigoProd: Yup.string(),
                fecha: Yup.string(),
                quienRecibe: Yup.string(),
                observaciones: Yup.string(),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                createMaterial(values)
                    .then(() => setMaterialSubmitted(true))
                    .catch(error => console.error(error))
            }}
        >
            <ShadowedForm>
                <h4 className="title is-4">Entrada de Material</h4>
                <div className="is-flex is-flex-direction-column">
                    <div>
                        <TextInputLabelWarning name='nombreProd' label='Nombre de Material' />
                        <TextInputNoMod name='fechaEntrada' label='Fecha de Entrada' value={hoy} />
                        <TextInputNoMod name='usuarioRecibio' label='Quién Recibe' value={userKey as string} />
                        <TextInputLabelWarning name='codigoProd' label='Código' />
                        <TextInputLabelWarning name='cantidad' label='Cantidad' />
                        <SelectWithLabel name="planta" label="Planta">
                            {plantas.map(planta => <option value={planta} key={planta}>{planta}</option>)}
                        </SelectWithLabel>
                        <div className="mt-5">
                            <TextArea name='observaciones' placeholder="Observaciones" />
                        </div>
                    </div>
                </div>
                <SubmitButton text="Crear Material" />
            </ShadowedForm>
        </Formik >
    );
}

export { FormularioEntradaMaterial };

