import { useMutation, useQuery } from "@tanstack/react-query";
import { mutationOnError, mutationOnSuccessReload, postFetch, rootUrl } from "../apis/api";
import { APIStringArg } from "../apis/api_func_args_types";
import { getProductsSalida } from "../apis/api_material";
import { Producto } from "../apis/api_productos";

interface CardProduct {
    id: string,
    codigo: string,
    cantidad: string,
    precioU: string,
    precioT: string,
    numPedido: string,
    folio: string,
    comentarios: string
    tipo_equipo: string
    numEconomico: string
    currency?: string
    stock?: string
}

function useSolicitudesController(userKey: APIStringArg) {
    const getNextFolioQuery = useQuery({
        queryKey: ["getNextFolioQuery"],
        queryFn: async () => {
            const response = await fetch(rootUrl + process.env.REACT_APP_BACKEND_GET_NEXT_SALIDA);
            const data = await response.text();
            return data;
        }
    });

    const getProductsSalidaQuery = useQuery<Producto[], Error>({
        queryKey: ["getProductsSalida", userKey],
        queryFn: async () => getProductsSalida(userKey)
    });

    const postMasterDetalleSalidaMutation = useMutation({
        mutationFn: (detalleSalida: { folio: APIStringArg, userKey: APIStringArg, descripcion: APIStringArg }) => {
            const endpoint = rootUrl + process.env.REACT_APP_BACKEND_POST_MASTER_PRODUCTS_SALIDAS;
            return postFetch(endpoint, detalleSalida);
        },
        onSuccess: mutationOnSuccessReload,
        onError: mutationOnError
    });

    const postDetalleSalidaMutation = useMutation({
        mutationFn: (productos: CardProduct[]) => {
            const endpoint = rootUrl + process.env.REACT_APP_BACKEND_POST_PRODUCTS_SALIDAS;
            return postFetch(endpoint, productos);
        },
        onSuccess: mutationOnSuccessReload,
        onError: mutationOnError
    });

    return {
        getNextFolioQuery,
        getProductsSalidaQuery,
        postDetalleSalidaMutation,
        postMasterDetalleSalidaMutation
    };
};

export default useSolicitudesController;