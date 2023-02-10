import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Role } from "../../usuarios/enum_roles";

interface loginValues {
    username: string
    password: string
}

interface loginReturn {
    loginSuccess: string,
    rolUsuario: string | null,
    cveUsuario: string | null
}

interface AuthContextInterface {
    token: string | null;
    onLogin: (values: loginValues) => Promise<void>;
    onLogout: () => void;
    userRole: string | null;
    userKey: string | null;
}

const AuthContext = React.createContext({} as AuthContextInterface);
function useAuth() {
    return React.useContext(AuthContext);
}

function getRoleFromString(rawRole: string | null): Role {
    switch (rawRole) {
        case "Admin": return Role.Admin;
        case "Chemico": return Role.Chemico
        default: return Role.Cliente;
    }
}

function AuthProvider(props: PropsWithChildren) {
    let localToken = localStorage.getItem('token');
    if (localToken && localToken !== "null") {
        localToken = JSON.parse(localToken);
    }
    else {
        localToken = null;
    }

    let cachedRole = localStorage.getItem('role');
    if (cachedRole && cachedRole !== "null") {
        cachedRole = JSON.parse(cachedRole);
    }
    else {
        cachedRole = null;
    }

    let cachedUserKey = localStorage.getItem('userKey');
    if (cachedUserKey && cachedUserKey !== "null") {
        cachedUserKey = JSON.parse(cachedUserKey);
    }
    else {
        cachedUserKey = null;
    }

    const [token, setToken] = useState<string | null>(localToken);
    const [role, setRole] = useState<string | null>(cachedRole);
    const [userKey, setUserKey] = useState<string | null>(cachedUserKey);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('role', JSON.stringify(role));
        localStorage.setItem('userKey', JSON.stringify(userKey));
    }, [token, role, userKey]);

    const handleLogin = (values: loginValues) => {
        return (
            fetch(`https://javaclusters-95554-0.cloudclusters.net/apiChemico-0.0.1-SNAPSHOT/api2/login/${values.username}/${values.password}/`)
                .then(response => response.json())
                .then((data: loginReturn) => {
                    if (data.loginSuccess !== "No") {
                        setToken('12345');
                        setRole(data.rolUsuario);
                        setUserKey(data.cveUsuario);
                        const origin = location.state?.from?.pathname || '/';
                        navigate(origin);
                    }
                })
        );
    };

    const handleLogout = () => {
        setToken(null);
    };

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        userRole: role,
        userKey: userKey
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider, getRoleFromString };

