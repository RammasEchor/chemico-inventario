import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { sendNewPassw } from "../apis/api_reset_passw";
import "../css/bulma.css";
import TextInputLabelWarning from "../form_components/text_input_label_warning";
import logo from "../images/logo.jpg";
import { useAuth } from "./auth-provider/auth_provider";

const buttonStyle: string = "button is-info is-medium"

function ResetPassword() {
    const { userKey } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="is-overlay has-background-info">
            <div className="p-5 is-flex is-justify-content-center">
                <Formik
                    initialValues={{
                        passw1: '',
                        passw2: ''
                    }}
                    validationSchema={Yup.object({
                        passw1: Yup.string()
                            .required(),
                        passw2: Yup.string()
                            .required()
                            .oneOf([Yup.ref('passw1')], 'Las contraseñas deben de ser iguales')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        sendNewPassw(values.passw1, userKey as string)
                            .then(data => {
                                data.text()
                            })
                            .then(res => {
                                navigate('/');
                            })
                            .catch(error => console.log(error))
                    }}
                >
                    <div className="column p-0 is-5 card">
                        <div className="pl-5 pt-5 card-image">
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="card-content">
                            <Form>
                                <TextInputLabelWarning
                                    label="Nueva Contraseña"
                                    name="passw1"
                                    type="password"
                                />
                                <TextInputLabelWarning
                                    label="Repetir Contraseña"
                                    name="passw2"
                                    type="password"
                                />
                                {/* {auth ?
                            <div>Error</div>
                            :
                            null
                        } */}
                                <div className="field">
                                    <div className="control is-flex is-justify-content-end">
                                        <button type="submit" className={buttonStyle}>Log in</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword