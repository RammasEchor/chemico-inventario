
function VerticalMenu() {
    return (
        <aside className="menu pl-5">
            <p className="menu-label">Usuarios</p>
            <ul className="menu-list">
                <li><a href="/">Alta de usuario</a></li>
                <li><a href="/">Baja de usuario</a></li>
            </ul>
            <p className="menu-label">Productos</p>
            <ul className="menu-list">
                <li><a href="/">Alta producto nuevo</a></li>
                <li><a href="/">Baja de producto</a></li>
                <li><a href="/">Traspaso entre ubicaciones</a></li>
                <li><a href="/">Asignar producto a usuario</a></li>
            </ul>
            <p className="menu-label">Cotización</p>
            <ul className="menu-list">
                <li><a href="/">Crear cotización</a></li>
                <li><a href="/">Estatus de cotización</a></li>
                <li><a href="/">Cancelar cotización</a></li>
            </ul>
            <p className="menu-label">Inventarios</p>
            <ul className="menu-list">
                <li><a href="/">Entrada de material</a></li>
                <li><a href="/">Salida de material</a></li>
                <li><a href="/">Impresión de ordenes de material</a></li>
                <li><a href="/">Listado de productos</a></li>
                <li><a href="/inventario">Inventario</a></li>
                <li><a href="/">Cancelar salida de material</a></li>
                <li><a href="/">Ajustes de inventario</a></li>
            </ul>
            <p className="menu-label">Aprobaciones</p>
            <ul className="menu-list">
                <li><a href="/">Aprobaciones</a></li>
            </ul>
            <p className="menu-label">Consultas</p>
            <ul className="menu-list">
                <li><a href="/">Reporte de entradas</a></li>
                <li><a href="/">Reporte de consumos</a></li>
                <li><a href="/">Reporte On hand/stock</a></li>
                <li><a href="/">Listado de usuarios</a></li>
            </ul>
        </aside>
    );
}

export default VerticalMenu