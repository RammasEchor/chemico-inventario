import * as React from 'react';
import Product from '../models/product';
interface ProductCardInterface {
    img: string;
    descripcion: string;
    precio: string;
    uni_medida: string;
    noParte: string;
    idProd: string;
    currency: string;
    stock?: string;
    prodsSolicitar: Product[];
    setProdsSolicitar: React.Dispatch<React.SetStateAction<Product[]>>;
    onClickAgregar?: (id: string) => boolean;
}
declare function ProductCard(p: ProductCardInterface): React.JSX.Element;
export { ProductCard };
