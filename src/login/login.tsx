import LoginForm from "./login_form";

function Login() {
    return (
        <div className="is-overlay has-background-info">
            <div className="p-5 is-flex is-justify-content-center">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login