import { PropsWithChildren } from "react";
import Tabla from "../../form_components/table";
import { productFieldsName } from "../campos_producto";

function TablaInventario(props: PropsWithChildren) {
    return (
        <Tabla cols={productFieldsName}>
            {props.children}
        </Tabla>
    );
}

export default TablaInventario