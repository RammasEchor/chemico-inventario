import { useMutation, useQuery } from "@tanstack/react-query";
import { getFetch, mutationOnError, mutationOnSuccessReload, postFetch, rootUrl } from "../apis/api";
import Almacen from "../models/almacen";

function useGetAlmacen() {
    const query = useQuery<Almacen[]>({
        queryKey: ['useGetAlmacen'],
        queryFn: async () => {
            const endpoint = rootUrl + process.env.REACT_APP_BACKEND_GET_ALMACENES;
            const data = await getFetch(endpoint);
            return data;
        }
    });

    return query;
}

function usePutAlmacen() {
    const mutation = useMutation({
        mutationKey: ['usePutAlmacen'],
        mutationFn: async (almacen: Almacen) => {
            const endpoint = rootUrl + process.env.REACT_APP_BACKEND_PUT_ALMACEN;
            return postFetch(endpoint, { id: almacen.id, monto: almacen.monto });
        },
        onError: mutationOnError,
        onSuccess: mutationOnSuccessReload
    });

    return mutation;
}

export { useGetAlmacen, usePutAlmacen };
