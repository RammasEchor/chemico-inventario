import * as React from 'react';
import Product from '../models/product';
interface ProductsBillInterface {
    prodsSolicitar: Product[];
}
declare function ProductsBill(props: ProductsBillInterface): React.JSX.Element;
export { ProductsBill };
