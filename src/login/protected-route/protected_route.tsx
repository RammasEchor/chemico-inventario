import React, { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../auth-provider/auth_provider";

function ProtectedRoute(props: PropsWithChildren) {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace state={{from: location}} />;
    }

    return <React.Fragment>{props.children}</React.Fragment>;
}

export default ProtectedRoute