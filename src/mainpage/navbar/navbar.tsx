import { useState } from "react";
import Brand from "./brand/brand";
import DropMenu from "./dropmenu/dropmenu";
import DropMenuItem from "./dropmenu/dropmenuitem";
import menu_layout from "./menu_struct";
import VerticalMenu from "./verticalmenu/verticalmenu";

function NavBar() {
    const [sideMenu, setSideMenu] = useState(false);
    const burger_click = () => {
        setSideMenu(!sideMenu);
    }

    const menu_items = menu_layout.map(topic =>
        <DropMenu text={topic.title} key={topic.title}>
            {topic.children.map(item =>
                <DropMenuItem text={item.title} link={item.link} key={item.title} />
            )}
        </DropMenu>
    );

    return (
        <nav className="navbar">
            <Brand onClick={burger_click} />
            {sideMenu
                ? <VerticalMenu />
                : <></>
            }
            <>{menu_items}</>
        </nav>
    );
}

export default NavBar