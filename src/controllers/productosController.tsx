import { useMutation, useQuery } from "@tanstack/react-query";
import { getFetch, mutationOnError, mutationOnSuccessReload, rootUrl } from "../apis/api";
import { Producto, getProducts, insertProduct, modifyProduct } from "../apis/api_productos";
import { useAuth } from "../login/auth-provider/auth_provider";
import Caducidad from "../models/caducidad";


function useProductosController() {
    const { userKey } = useAuth();

    const postProductMutation = useMutation({
        mutationFn: insertProduct,
        onSuccess: mutationOnSuccessReload,
        onError: mutationOnError
    });

    const putProductMutation = useMutation({
        mutationFn: modifyProduct,
        onSuccess: mutationOnSuccessReload,
        onError: mutationOnError
    });

    const getProductsQuery = useQuery<Producto[]>({
        queryKey: ["getProductsQuery"],
        queryFn: getProducts
    });

    const getCaducidadesQuery = useQuery<Caducidad[]>({
        queryKey: ["getCaducidadesQuery"],
        queryFn: async () => {
            const endpoint = rootUrl + process.env.REACT_APP_BACKEND_GET_CADUCIDADES + `${userKey}/`;
            const data = await getFetch(endpoint);
            return data;
        }
    });

    return {
        postProductMutation,
        putProductMutation,
        getProductsQuery,
        getCaducidadesQuery
    };
}

export default useProductosController;