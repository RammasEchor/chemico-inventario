import { Formik } from "formik"
import { ComponentPropsWithoutRef, useState } from "react"
import { postContpaq } from "../../apis/api_cotizacion"
import TextInputLabelWarning from "../../form_components/text_input_label_warning"

interface Props extends ComponentPropsWithoutRef<'div'> {
    folio: string,
    onClickCancelar: () => void
}

function ConpaqModal(props: Props) {
    const [conpaqSubmitted, setConpaqSubmitted] = useState(false);

    if (conpaqSubmitted) {
        props.onClickCancelar();
    }

    return (
        <Formik
            initialValues={{
                comment: '',
                fecha: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                postContpaq({ comment: parseInt(values.comment), fecha: values.fecha, folio: props.folio })
                    .then(response => {
                        if (response.ok)
                            setConpaqSubmitted(true)
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
                            <TextInputLabelWarning name='fecha' label='Fecha' />
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