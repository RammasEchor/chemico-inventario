import { PropsWithChildren } from "react";
import Tabla from "../../form_components/table";
import { productFieldsName } from "../campos_producto";

function TablaProducto(props: PropsWithChildren) {
    return (
        <Tabla cols={productFieldsName}>
            {props.children}
        </Tabla>
    );
}

export default TablaProducto