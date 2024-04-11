import * as React from 'react';
interface Product {
    id: string;
    codigo: string;
    cantidad: string;
    precioU: string;
    precioT: string;
    numPedido: string;
    folio: string;
    comentarios: string;
}
interface ProductCardInterface {
    img: string;
    descripcion: string;
    precio: string;
    uni_medida: string;
    noParte: string;
    idProd: string;
    prodsSolicitar: Product[];
    setProdsSolicitar: React.Dispatch<React.SetStateAction<Product[]>>;
}
declare function ProductCard(p: ProductCardInterface): React.JSX.Element;
export { ProductCard };
