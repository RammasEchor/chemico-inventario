import LoginForm from "./login_form";

function Login() {
    return (
        <div className="is-overlay has-background-info">
            <div className="p-5 is-flex is-justify-content-center">
                <LoginForm />

            </div>
            <footer className="footer footer1 py-2 has-text-white has-background-info">
                <div className="content has-text-centered">
                    <p>
                        Copyright 2023 <strong className="has-text-white">Chemico Group</strong>. All rights reserved.
                    </p>
                    <a
                        className="has-text-white is-underlined"
                        href="https://www.thechemicogroup.com/information-statements-and-terms/"
                    >Términos y Condiciones de Uso</a>
                </div>
            </footer>
        </div>
    );
}

export default Login