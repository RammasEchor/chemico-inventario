import { checkRootEnvironURL, envErrorMsg } from "../utilities/check_env";
import { failedPromise } from "../utilities/failed_promise";

function checkPlantEnvironURLS() {
    if (!checkRootEnvironURL() ||
        !process.env.REACT_APP_BACKEND_GET_PLANTS) {
        return false;
    }

    return true;
}

function getPlants() {
    if (!checkPlantEnvironURLS()) {
        return (failedPromise(envErrorMsg));
    }

    let api_url = process.env.REACT_APP_BACKEND_ROOT_URL as string;
    api_url += process.env.REACT_APP_BACKEND_GET_PLANTS;
    return fetch(api_url);
}

interface PlantasAPI {
    id: string
    nombre: string
}

export { getPlants };
export type { PlantasAPI };

