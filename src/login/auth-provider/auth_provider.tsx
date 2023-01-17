import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import fakeAuth from "./fake_auth";

interface AuthContextInterface {
    token: string | null;
    onLogin: () => Promise<void>;
    onLogout: () => void;
}

const AuthContext = React.createContext({} as AuthContextInterface);
function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider(props: PropsWithChildren) {
    let localToken = localStorage.getItem('token');
    if( localToken )    {
        localToken = JSON.parse(localToken);
    }

    const [token, setToken] = useState<string | null>(localToken);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    const handleLogin = async () => {
        const token = await fakeAuth();

        setToken(token);
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);
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

