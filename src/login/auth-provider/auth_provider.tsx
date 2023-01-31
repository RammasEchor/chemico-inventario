import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface loginValues {
    username: string
    password: string
}

interface AuthContextInterface {
    token: string | null;
    onLogin: (values: loginValues) => Promise<void>;
    onLogout: () => void;
}

const AuthContext = React.createContext({} as AuthContextInterface);
function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider(props: PropsWithChildren) {
    let localToken = localStorage.getItem('token');
    if (localToken) {
        localToken = JSON.parse(localToken);
    }

    const [token, setToken] = useState<string | null>(localToken);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    const handleLogin = (values: loginValues) => {
        return (
            fetch(`https://javaclusters-95554-0.cloudclusters.net/apiChemico-0.0.1-SNAPSHOT/api2/login/${values.username}/${values.password}/`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setToken('12345');
                        const origin = location.state?.from?.pathname || '/';
                        navigate(origin);
                    }
                }));
    };

    const handleLogout = () => {
        setToken(null);
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider };

