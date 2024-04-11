import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface loginValues {
    username: string
    password: string
}

interface loginReturn {
    loginSuccess: string,
    rolUsuario: string,
    cveUsuario: string,
    nuevo: number,
    planta: string
}

interface AuthContextInterface {
    token: string | null;
    onLogin: (values: loginValues) => Promise<void>;
    onLogout: () => void;
    userRole: string | null;
    userKey: string | null;
    userPlant: string | null;
}

const AuthContext = React.createContext({} as AuthContextInterface);
function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider(props: PropsWithChildren) {
    let localToken = localStorage.getItem('token');
    let cachedRole = localStorage.getItem('role');
    let cachedUserKey = localStorage.getItem('userKey');
    let cachedUserPlant = localStorage.getItem('userPlant');

    const [token, setToken] = useState<string | null>(localToken);
    const [role, setRole] = useState<string | null>(cachedRole);
    const [userKey, setUserKey] = useState<string | null>(cachedUserKey);
    const [userPlant, setUserPlant] = useState<string | null>(cachedUserPlant);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) { localStorage.setItem('token', token) }
        if (role) { localStorage.setItem('role', role) }
        if (userKey) { localStorage.setItem('userKey', userKey) }
        if (userPlant) { localStorage.setItem('userPlant', userPlant) }
    }, [token, role, userKey, userPlant]);

    const handleLogin = (values: loginValues) => {
        let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
        api_url += 'login/';

        return (
            fetch(api_url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "usu": values.username,
                    "pass": values.password
                })
            })
                .then(response => {
                    return response.json()
                })
                .then((data: loginReturn) => {
                    if (data.loginSuccess !== "No") {
                        setToken('12345');
                        setRole(data.rolUsuario);
                        setUserKey(data.cveUsuario);
                        setUserPlant(data.planta);
                        if (data.nuevo === 0) {
                            navigate('/change_passw');
                        }
                        else {
                            const origin = location.state?.from?.pathname || '/';
                            navigate(origin);
                        }
                    }

                    else {
                        alert("Usuario/Contraseña incorrecto(s)")
                    }
                })
                .catch(error => console.log(error))
        );
    };

    const handleLogout = () => {
        setToken(null);
    };

    const values = {
        token: token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        userRole: role,
        userKey: userKey,
        userPlant: userPlant
    };

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };

