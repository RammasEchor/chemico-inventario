import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";
import { UserFields } from "./campos_usuario";

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

    return fetch(api_url);
}

function getRoles() {
    if (!checkUserEnvironURLS) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_ROLES
    return fetch(api_url);
}

export { createUser, getRoles, getUsers };

