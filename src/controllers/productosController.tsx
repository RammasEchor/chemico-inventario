import { useMutation, useQuery } from "@tanstack/react-query";
import { mutationOnError, mutationOnSuccessReload } from "../apis/api";
import { Producto, getProducts, insertProduct, modifyProduct } from "../apis/api_productos";

function useProductosController() {
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

    return {
        postProductMutation,
        putProductMutation,
        getProductsQuery
    };
}

export default useProductosController;