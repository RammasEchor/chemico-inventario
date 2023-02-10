import { PropsWithChildren } from "react";
import Tabla from "../../form_components/table";
import { quoteFieldsTableTitles } from "../campos_cotizacion";

function TablaCotizacion(props: PropsWithChildren) {
    return (
        <Tabla cols={quoteFieldsTableTitles}>
            {props.children}
        </Tabla>
    );
}

export default TablaCotizacion