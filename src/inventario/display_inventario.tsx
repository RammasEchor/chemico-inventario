import { useEffect, useState } from "react";
import { getProducts } from "../productos/api_productos";
import TablaInventario from "./tabla_inventario";

interface ProductFields {
    idProd: string,
    planta: string,
    noParte: string,
    descripcion: string,
    maximo: string,
    minimo: string,
    precio: string,
    uni_medida: string,
    fecha_exp: string,
    ubicacion: string
}

function DisplayInventario() {
    const [products, setProducts] = useState<ProductFields[]>([]);
    const [prodIdToDelete, setProdIdToDelete] = useState<string>();

    useEffect(() => {
        getProducts()
            .then(response => response.json())
            .then((data: ProductFields[]) => {
                setProducts(data);
            });
    }, []);

    return (
        <div className="box">
            <h4 className="title is-4">Inventario</h4>
            <TablaInventario>
                {products.map(product => {
                    return (
                        <tr id={product.idProd}
                            key={product.idProd}
                            onClick={() => setProdIdToDelete(product.idProd)}
                            className={prodIdToDelete === product.idProd ? 'is-selected' : ''}
                        >
                            <td key={product.planta}>{product.planta}</td>
                            <td key={product.noParte}>{product.noParte}</td>
                            <td key={product.descripcion}>{product.descripcion}</td>
                            <td key={product.maximo}>{product.maximo}</td>
                            <td key={product.minimo}>{product.minimo}</td>
                            <td key={product.precio}>{product.precio}</td>
                            <td key={product.uni_medida}>{product.uni_medida}</td>
                            <td key={product.fecha_exp}>{product.fecha_exp}</td>
                            <td key={product.ubicacion}>{product.ubicacion}</td>
                        </tr>
                    );
                })}
            </TablaInventario>
        </div>
    );
}

export default DisplayInventario