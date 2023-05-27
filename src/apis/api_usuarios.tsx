import { UserFields } from "../usuarios/campos_usuario";
import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";

function checkUserEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_INSERT_USER ||
        !process.env.REACT_APP_BACKEND_GET_USERS ||
        !process.env.REACT_APP_BACKEND_GET_ROLES) {
        return false;
    }

    return true;
}

function getUsers() {
    if (!checkUserEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_USERS
    return fetch(api_url);
}

function createUser(user: UserFields) {
    if (!checkUserEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    // Before this we checked that the env variables exist
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_INSERT_USER
    api_url += `${user.name}/`
    api_url += `${user.userKey}/`
    api_url += `${user.password}/`
    api_url += `${user.email}/`
    api_url += `${user.plant}/`
    api_url += `${user.rol}/`
    api_url += `${user.aprobador1}/`
    api_url += `${user.aprobador2}/`
    api_url += `${user.monto_aprobador}/`

    return fetch(api_url);
}

function getRoles() {
    if (!checkUserEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_ROLES
    return fetch(api_url);
}

function getAprobadores(planta: string) {
    if (!checkUserEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APROBADORES
    api_url += `${planta}/`
    return fetch(api_url);
}

function getAprobadores2(planta: string) {
    if (!checkUserEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_APROBADORES2
    api_url += `${planta}/`
    return fetch(api_url);
}

function modifyUser(user: UserFields) {
    if (!checkUserEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_MODIFY_USER

    return fetch(api_url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}

export { createUser, getRoles, getUsers, getAprobadores, getAprobadores2, modifyUser };

