import React from "react";
import { useLocation, useNavigate } from "react-router";
import fakeAuth from "./fake_auth";

interface props {
    children: React.ReactNode
}

interface AuthContextInterface {
    token: string | null;
    onLogin: () => Promise<void>;
    onLogout: () => void;
}

const AuthContext = React.createContext({} as AuthContextInterface);
function useAuth() {
    return React.useContext(AuthContext);
}

function AuthProvider(props: props) {
    const [token, setToken] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async () => {
        const token = await fakeAuth();

        setToken(token);
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);
    };

    const handleLogout = () => {
        setToken(null);
    };

    const value: AuthContextInterface = {
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

