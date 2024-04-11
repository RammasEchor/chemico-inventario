import { useMutation, useQuery } from "@tanstack/react-query";
import { mutationOnError, mutationOnSuccessReload } from "../apis/api";
import { APIStringArg } from "../apis/api_func_args_types";
import { getProductsSalida, postMasterDetalleSalida } from "../apis/api_material";
import { Producto } from "../apis/api_productos";


function useSolicitudesController(userKey: APIStringArg) {
    const getProductsSalidaQuery = useQuery<Producto[], Error>({
        queryKey: ["getProductsSalida", userKey],
        queryFn: async () => getProductsSalida(userKey)
    });

    const postMasterDetalleSalidaMutation = useMutation({
        mutationFn: ({ folio, userKey, descripcion }: { folio: APIStringArg, userKey: APIStringArg, descripcion: APIStringArg }) => {
            return postMasterDetalleSalida(folio, userKey, descripcion);
        },
        onSuccess: mutationOnSuccessReload,
        onError: mutationOnError
    });

    return {
        getProductsSalidaQuery,
        postMasterDetalleSalidaMutation
    };
};

export default useSolicitudesController;