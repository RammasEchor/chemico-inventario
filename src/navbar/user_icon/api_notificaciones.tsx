import { checkRootEnvironURL, envErrorMsg } from "../../utilities/check_env";
import { failedPromise } from "../../utilities/failed_promise";

function checkNotificationsEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_GET_NOTIFICATIONS) {
        return false;
    }

    return true;
}

function getPendingQuotes() {
    if (!checkNotificationsEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_NOTIFICATIONS
    return fetch(api_url);
}

export { getPendingQuotes };

