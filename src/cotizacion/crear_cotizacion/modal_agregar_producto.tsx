import { Formik } from "formik";
import * as Yup from "yup";
import { ProductInQuote } from "../../apis/api_cotizacion";
import { SelectWithLabel } from "../../form_components/select_with_label";
import TextInputLabelWarning from "../../form_components/text_input_label_warning";
import TextArea from "../../form_components/textarea";
import { useAuth } from "../../login/auth-provider/auth_provider";
import { appendFieldRequiredSpanish } from "../../utilities/error_messages";

interface AddProductProps {
  onClickX: () => void;
  onClickCancel?: () => void;
  onClickAprobar: (values: ProductInQuote) => void;
}

function AddProduct(props: AddProductProps) {
  const { userPlant } = useAuth();

  return (
    <Formik
      initialValues={{ ...new ProductInQuote(), planta: userPlant as string, avox: "avox" }}
      validationSchema={Yup.object({
        descripcion: Yup.string().required(
          appendFieldRequiredSpanish("Nombre")
        ),
        noParte: Yup.string().required(appendFieldRequiredSpanish("noParte")),
        fabricante: Yup.string().required(
          appendFieldRequiredSpanish("Fabricante")
        ),
        cant: Yup.string().required(appendFieldRequiredSpanish("Cantidad")),
        presentacion: Yup.string().required(
          appendFieldRequiredSpanish("Presentación")
        ),
        uni_medida: Yup.string().required(
          appendFieldRequiredSpanish("Unidad de Medida")
        ),
        planta: Yup.string().required(appendFieldRequiredSpanish("planta")),
        area: Yup.string().required(appendFieldRequiredSpanish("Área")),
        datos_adicionales: Yup.string().required("Requerido"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        if (!values.datos_adicionales) {
          values.datos_adicionales = "-";
        }
        setSubmitting(false);
        props.onClickAprobar(values);
        props.onClickX();
      }}
    >
      {(formikProps) => (
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Agregar producto</p>
            <button
              className="delete"
              aria-label="close"
              onClick={props.onClickX}
            />
          </header>
          <div className="modal-card-body">
            <TextInputLabelWarning name="descripcion" label="Nombre" />
            <TextInputLabelWarning name="noParte" label="Número de parte" />
            <TextInputLabelWarning name="fabricante" label="Fabricante" />
            <TextInputLabelWarning name="cant" label="Cantidad a solicitar" />
            <TextInputLabelWarning name="presentacion" label="Presentación" />
            <TextInputLabelWarning name="uni_medida" label="Unidad de Medida" />
            <TextInputLabelWarning
              name="planta"
              label="Planta"
              value={userPlant as string}
              readOnly={true}
            />
            <TextInputLabelWarning name="area" label="Área de Utilización" />
            {userPlant === "Planta 3 Oxygen" && (
              <SelectWithLabel name="avox" label="AVOX/SEM">
                <option value="avox">avox</option>
                <option value="sem">sem</option>
              </SelectWithLabel>
            )}
            <div className="mt-5">
              <TextArea name="datos_adicionales" placeholder="Datos Adicionales" />
              {formikProps.errors["datos_adicionales"] && (
                <div className="has-text-danger">{`${formikProps.errors["datos_adicionales"]}`}</div>
              )}
            </div>
          </div>
          <footer className="modal-card-foot is-flex is-justify-content-flex-end">
            <button
              className="button is-success"
              disabled={!formikProps.isValid}
              onClick={formikProps.submitForm}
            >
              Agregar
            </button>
            <button
              className="button"
              type="button"
              onClick={props.onClickCancel}
            >
              Cancelar
            </button>
          </footer>
        </div>
      )}
    </Formik>
  );
}

export { AddProduct };
