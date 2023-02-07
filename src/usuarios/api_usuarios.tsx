import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";
import userFields from "./campos_usuario";

function checkUserEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_USER ||
        !process.env.REACT_APP_BACKEND_ROLES) {
        return false;
    }

    return true;
}

function createUser(user: userFields) {
    if (!checkUserEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    // Before this we checked that the env variables exist
    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_USER
    api_url += `${user.name}`
    api_url += `${user.password}`
    api_url += `${user.rol}`
    api_url += `${user.email}`
    api_url += `${user.plant}`
    api_url += `${user.userKey}`

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

export { createUser, getRoles };

