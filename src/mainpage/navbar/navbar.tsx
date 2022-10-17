import { useState } from "react";
import Brand from "./brand/brand";
import DropMenu from "./dropmenu/dropmenu";
import DropMenuItem from "./dropmenu/dropmenuitem";
import VerticalMenu from "./verticalmenu/verticalmenu";

function NavBar() {
    const [sideMenu, setSideMenu] = useState(false);
    const burger_click = () => {
        setSideMenu(!sideMenu);
    }

    return (
        <nav className="navbar">
            <Brand onClick={burger_click}/>
            { sideMenu
            ? <VerticalMenu />
            : <></>
            }
            <DropMenu text="Usuarios">
                <DropMenuItem text="Alta de usuario" />
                <DropMenuItem text="Baja de usuario" />
            </DropMenu>
            <DropMenu text="Productos">
                <DropMenuItem text="Alta producto nuevo" />
                <DropMenuItem text="Baja de producto" />
                <DropMenuItem text="Traspaso entre ubicaciones" />
                <DropMenuItem text="Asignar producto a usuario" />
            </DropMenu>
            <DropMenu text="Cotización">
                <DropMenuItem text="Crear cotización" />
                <DropMenuItem text="Estatus de cotización" />
                <DropMenuItem text="Cancelar cotización" />
            </DropMenu>
            <DropMenu text="Inventarios">
                <DropMenuItem text="Entrada de material" />
                <DropMenuItem text="Salida de material" />
                <DropMenuItem text="Impresión de ordenes de material" />
                <DropMenuItem text="Listado de productos" />
                <DropMenuItem text="Inventario" link="inventario" />
                <DropMenuItem text="Cancelar salida de material" />
                <DropMenuItem text="Ajustes de inventario" />
            </DropMenu>
            <DropMenu text="Aprobaciones">
                <DropMenuItem text="Aprobaciones" />
            </DropMenu>
            <DropMenu text="Consultas">
                <DropMenuItem text="Reporte de entradas" />
                <DropMenuItem text="Reporte de consumos" />
                <DropMenuItem text="Reporte On hand/stock" />
                <DropMenuItem text="Listado de usuarios" />
            </DropMenu>
        </nav>
    );
}

export default NavBar