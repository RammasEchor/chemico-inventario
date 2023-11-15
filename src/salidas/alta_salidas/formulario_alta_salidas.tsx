import { Formik } from "formik";

function FormularioAltaSalida() {
    return (
        <Formik
            initialValues={{}}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
            }}
        >

        </Formik>
    );
}

export default FormularioAltaSalida;