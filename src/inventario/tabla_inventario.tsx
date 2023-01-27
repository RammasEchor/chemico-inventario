import { PropsWithChildren } from "react";

function TablaInventario(props: PropsWithChildren) {
    const cols = [
        'Planta',
        'No. Parte',
        'Descripción',
        'Máximo',
        'Mínimo',
        'Precio unitario',
        'Unidad de medida',
        'Fecha de expiración',
        'Ubicación almacén'
    ]

    const jsx_cols = cols.map((name) => {
        return (<th key={name}>{name}</th>);
    });

    return (
        <div className="table-container">
            <table className="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        {jsx_cols}
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        {jsx_cols}
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        {props.children}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TablaInventario