import { PropsWithChildren } from "react";
import Tabla from "../../form_components/table";

function TablaUsuarios(props: PropsWithChildren) {
    const cols = [
        'Nombre',
        'Rol',
        'Email',
        'Planta',
        'CveUsuario'
    ]

    return (
        <Tabla cols={cols}>
            {props.children}
        </Tabla>
    );
}

export default TablaUsuarios