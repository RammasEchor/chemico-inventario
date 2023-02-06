const envErrorMsg = 'Env variables are not defines (Backend URLS)';

function checkRootEnvironURL() {
    if (!process.env.REACT_APP_BACKEND_ROOT_URL) {
        return false;
    }

    return true;
}

export { checkRootEnvironURL, envErrorMsg };

