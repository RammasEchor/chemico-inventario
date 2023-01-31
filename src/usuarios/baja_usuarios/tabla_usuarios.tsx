import { PropsWithChildren } from "react";

function TablaUsuarios(props: PropsWithChildren) {
    const cols = [
        'Nombre',
        'Rol',
        'Email',
        'Planta',
        'CveUsuario'
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

export default TablaUsuarios