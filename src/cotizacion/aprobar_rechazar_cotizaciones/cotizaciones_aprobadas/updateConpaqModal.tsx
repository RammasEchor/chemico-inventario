import { Formik } from "formik";
import { ComponentPropsWithoutRef, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { postContpaq } from "../../../apis/api_cotizacion";
import DatePickerField from "../../../form_components/datepicker";
import TextInputLabelWarning from "../../../form_components/text_input_label_warning";
import { appendFieldRequiredSpanish } from "../../../utilities/error_messages";

interface Props extends ComponentPropsWithoutRef<'div'> {
    folio: string,
    onClickCancelar: () => void
}

function ConpaqModal(props: Props) {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                comment: '',
                fecha: date.toISOString()
            }}
            validationSchema={Yup.object({
                comment: Yup.string()
                    .required(appendFieldRequiredSpanish('No. Orden de Compra'))
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                values.fecha = date.toISOString();
                postContpaq({ ...values, folio: props.folio })
                    .then(response => {
                        if (response.ok)
                            navigate(0);
                    })
                    .catch(error => console.log(error))
            }}
        >
            {fprops =>
                <div className='card'>
                    <header className='card-header'>
                        <p className='card-header-title'>
                            Agregar Información
                        </p>
                    </header>
                    <div className='card-content'>
                        <div className="mt-5 mb-5">
                            <TextInputLabelWarning name='comment' label='No. Orden de Compra' />
                            <DatePickerField label="Fecha" selected={date} onChange={setDate} popperPlacement="top-start" />
                        </div>
                    </div>
                    <footer className="modal-card-foot is-flex is-justify-content-flex-end">
                        <button className="button is-danger is-outlined" onClick={props.onClickCancelar}>Cerrar</button>
                        <button type="submit" className="button is-success" onClick={fprops.submitForm}>Enviar</button>
                    </footer>
                </div>
            }
        </Formik>
    )
}

export default ConpaqModal