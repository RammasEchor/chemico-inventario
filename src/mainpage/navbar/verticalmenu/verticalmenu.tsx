import { Link } from "react-router-dom";

function VerticalMenu() {
    return (
        <aside className="menu pl-5">
            <p className="menu-label">Usuarios</p>
            <ul className="menu-list">
                <li><Link to="/">Alta de usuario</Link></li>
                <li><Link to="/">Baja de usuario</Link></li>
            </ul>
            <p className="menu-label">Productos</p>
            <ul className="menu-list">
                <li><Link to="/">Alta producto nuevo</Link></li>
                <li><Link to="/">Baja de producto</Link></li>
                <li><Link to="/">Traspaso entre ubicaciones</Link></li>
                <li><Link to="/">Asignar producto a usuario</Link></li>
            </ul>
            <p className="menu-label">Cotización</p>
            <ul className="menu-list">
                <li><Link to="/">Crear cotización</Link></li>
                <li><Link to="/">Estatus de cotización</Link></li>
                <li><Link to="/">Cancelar cotización</Link></li>
            </ul>
            <p className="menu-label">Inventarios</p>
            <ul className="menu-list">
                <li><Link to="/">Entrada de material</Link></li>
                <li><Link to="/">Salida de material</Link></li>
                <li><Link to="/">Impresión de ordenes de material</Link></li>
                <li><Link to="/">Listado de productos</Link></li>
                <li><Link to="/inventario">Inventario</Link></li>
                <li><Link to="/">Cancelar salida de material</Link></li>
                <li><Link to="/">Ajustes de inventario</Link></li>
            </ul>
            <p className="menu-label">Aprobaciones</p>
            <ul className="menu-list">
                <li><Link to="/">Aprobaciones</Link></li>
            </ul>
            <p className="menu-label">Consultas</p>
            <ul className="menu-list">
                <li><Link to="/">Reporte de entradas</Link></li>
                <li><Link to="/">Reporte de consumos</Link></li>
                <li><Link to="/">Reporte On hand/stock</Link></li>
                <li><Link to="/">Listado de usuarios</Link></li>
            </ul>
        </aside>
    );
}

export default VerticalMenu