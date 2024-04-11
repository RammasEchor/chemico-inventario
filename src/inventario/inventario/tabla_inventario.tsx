import { PropsWithChildren } from "react";
import Tabla from "../../form_components/table";

function TablaInventario(props: PropsWithChildren) {
    const MaterialTableNames = [
        'Nombre',
        'Código',
        'Fecha Entrada',
        'Recibido Por',
        'Cantidad',
        'Planta',
        'Observaciones'
    ]

    return (
        <Tabla cols={MaterialTableNames}>
            {props.children}
        </Tabla>
    );
}

export default TablaInventario