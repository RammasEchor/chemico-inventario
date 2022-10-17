import NavBar from "../mainpage/navbar/navbar";

function Inventario() {
    return (
        <div>
            <NavBar />
            <div className="table-container">
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Planta</th>
                            <th>No. Parte</th>
                            <th>Descripción</th>
                            <th>Máximo</th>
                            <th>Mínimo</th>
                            <th>Precio unitario</th>
                            <th>Unidad de medida</th>
                            <th>Fecha de expiración</th>
                            <th>Ubicación almacén</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Planta</th>
                            <th>No. Parte</th>
                            <th>Descripción</th>
                            <th>Máximo</th>
                            <th>Mínimo</th>
                            <th>Precio unitario</th>
                            <th>Unidad de medida</th>
                            <th>Fecha de expiración</th>
                            <th>Ubicación almacén</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Planta</td>
                            <th>1</th>
                            <td>Descripción</td>
                            <td>Máximo</td>
                            <td>Mínimo</td>
                            <td>Precio unitario</td>
                            <td>Unidad de medida</td>
                            <td>Fecha de expiración</td>
                            <td>Ubicación almacén</td>
                        </tr>
                        <tr>
                            <td>Planta</td>
                            <th>2</th>
                            <td>Descripción</td>
                            <td>Máximo</td>
                            <td>Mínimo</td>
                            <td>Precio unitario</td>
                            <td>Unidad de medida</td>
                            <td>Fecha de expiración</td>
                            <td>Ubicación almacén</td>
                        </tr>
                        <tr>
                            <td>Planta</td>
                            <th>3</th>
                            <td>Descripción</td>
                            <td>Máximo</td>
                            <td>Mínimo</td>
                            <td>Precio unitario</td>
                            <td>Unidad de medida</td>
                            <td>Fecha de expiración</td>
                            <td>Ubicación almacén</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Inventario