import { PropsWithChildren } from "react";

function LayoutTablaCotizacion(props: PropsWithChildren) {
    const cols = [
        'Nombre',
        'Parte',
        'Fabricante',
        'Cantidad',
        'Presentación',
        'Unidad',
        'Planta',
        'Área'
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
                    {props.children}
                </tbody>
            </table>
        </div>
    );
}

export default LayoutTablaCotizacion