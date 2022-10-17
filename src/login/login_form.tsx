import { Form, Formik, useField } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import "../css/bulma.css";
import logo from "../images/logo.jpg";

const TextInput = ({ label, ...props }: { label: string, [x: string]: any; }) => {
    const [field, meta] = useField(props as any);
    return (
        <div className="field">
            {/* <label className="label is-medium" htmlFor={props.id || props.name}>{label}</label> */}
            <div className="control">
                <input {...field} {...props} className="input is-medium" placeholder={label} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </div>
        </div>
    );
}

interface loginValues {
    username: string
    password: string
}

const buttonStyle: string = "button is-info is-medium"

function LoginForm() {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (values: loginValues, { setSubmitting }: { setSubmitting: any }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
                'X-RapidAPI-Host': 'bb-finance.p.rapidapi.com'
            }
        };
        setAuth(true);

        fetch('https://bb-finance.p.rapidapi.com/market/auto-complete?query=apple', options)
            .then(response => response.json())
            .then(() => navigate("/inventario", { replace: true }))
            .catch(err => console.error(err));
    }

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={Yup.object({
                username: Yup.string(),
                // .email('Invalid email address')
                // .required('Required'),
                password: Yup.string()
                // .max(15, 'Must be 15 characters or less')
                // .required('Required')
            })}
            onSubmit={onSubmit}
        >
            <div className="column p-0 is-5 card">
                <div className="pl-5 pt-5 card-image">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="card-content">
                    <Form>
                        <TextInput
                            label="Username"
                            name="username"
                            type="text"
                        />
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                        />
                        {auth ?
                            <div>Error</div>
                            :
                            null
                        }
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