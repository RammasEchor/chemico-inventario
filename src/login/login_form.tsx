import { Form, Formik } from "formik";
import * as Yup from "yup";
import "../css/bulma.css";
import TextInputLabelWarning from "../form_components/text_input_label_warning";
import logo from "../images/logo.jpg";
import { appendFieldRequiredSpanish } from "../utilities/error_messages";
import { useAuth } from "./auth-provider/auth_provider";



const buttonStyle: string = "button is-info is-medium"

function LoginForm() {
    const { onLogin } = useAuth();

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={Yup.object({
                username: Yup
                    .string()
                    .required(appendFieldRequiredSpanish('Usuario')),
                password: Yup.string()
                    .required(appendFieldRequiredSpanish('Contraseña'))
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                onLogin(values);
            }}
        >
            <div className="column p-0 is-5 card">
                <div className="pl-5 pt-5 card-image">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="card-content">
                    <Form>
                        <TextInputLabelWarning
                            label="Usuario"
                            name="username"
                            type="text"
                        />
                        <TextInputLabelWarning
                            label="Contraseña"
                            name="password"
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
    );
}

export default LoginForm