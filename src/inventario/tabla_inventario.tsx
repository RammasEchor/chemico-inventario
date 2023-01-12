function TablaInventario() {
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
        return( <th key={name}>{name}</th> );
    });

    const jsx_rows = cols.map((name) => {
        return( <td key={name}>{name}</td> );
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
                        {jsx_rows}
                    </tr>
                    <tr>
                        {jsx_rows}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TablaInventario