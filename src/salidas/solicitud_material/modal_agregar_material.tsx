import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Material, getProductInfoSalida, getProductsSalida } from "../../apis/api_material";
import { SelectWithLabel } from "../../form_components/select_with_label";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import { useAuth } from "../../login/auth-provider/auth_provider";

interface AgregarMaterialProps {
    onClickCancelar: () => void;
    onClickAceptar: (item: Material) => void
    folio: string
}

function AgregarMaterial(props: AgregarMaterialProps) {
    const [currentCode, setCurrentCode] = useState<string>("");
    const [material, setMaterial] = useState<Material>(new Material());
    const [materials, setMaterials] = useState<string[]>([]);

    const { userKey } = useAuth();

    useEffect(() => {
        getProductsSalida(userKey)
            .then(res => res.json())
            .then(data => {
                setMaterials(data)
                setCurrentCode(data[0])
            })
    }, [userKey]);

    useEffect(() => {
        if (!currentCode) {
            return;
        }

        getProductInfoSalida(currentCode)
            .then(res => res.json())
            .then(data => {
                setMaterial({
                    codigo: currentCode,
                    precioU: data.precio,
                    precioT: "",
                    cantidad: "",
                    numPedido: "",
                    folio: props.folio,
                    id: ""
                })
            })

    }, [currentCode, props.folio]);
    
    return (
        <Formik
            initialValues={material}
            enableReinitialize={true}
            validationSchema={Yup.object({})}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                props.onClickAceptar(values);
            }}
        >
            {formikProps =>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Agregar producto</p>
                        <button className="delete" aria-label="close" type="button" onClick={props.onClickCancelar} />
                    </header>
                    <div className="modal-card-body">
                        <SelectWithLabel name='codigo' label='Nombre y Código del Producto'>
                            {materials.map(m => <option value={m} key={m}>{m}</option>)}
                        </SelectWithLabel>
                        <TextInputLabelWarning name='cantidad' label='Cantidad' value={formikProps.values.cantidad} onChange={e => {
                            formikProps.setFieldValue('cantidad', e.currentTarget.value);
                            let cantidad = 0;
                            if(e.currentTarget.value)
                                cantidad = Number(e.currentTarget.value);
                            formikProps.setFieldValue('precioT', `${cantidad * Number(formikProps.values.precioU)}`);
                        }} />
                        <TextInputLabelWarning name='precioU' label='Precio Unitario' disabled />
                        <TextInputLabelWarning name='precioT' label='Precio Total' value={formikProps.values.precioT} disabled />
                        <TextInputLabelWarning name='numPedido' label='Número de Pedido' />
                    </div>
                    <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                        <button className="button is-danger is-outlined" type="button" onClick={props.onClickCancelar}>Cancelar</button>
                        <button className="button is-success" type="button" onClick={formikProps.submitForm}>Agregar</button>
                    </footer>
                </div>
            }
        </Formik>
    );
}

export default AgregarMaterial;