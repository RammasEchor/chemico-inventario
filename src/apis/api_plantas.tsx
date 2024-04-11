
function getPlants() {
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

