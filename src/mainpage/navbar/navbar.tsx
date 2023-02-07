import { Dispatch, SetStateAction, useState } from "react";
import Brand from "./brand/brand";
import DropMenu from "./dropmenu/dropmenu";
import DropMenuItem from "./dropmenu/dropmenuitem";
import menu_layout from "./menu_struct";
import UserIcon from "./user_icon/user_icon";
import VerticalMenu from "./verticalmenu/verticalmenu";

interface NavBarProps {
    setBurgerOpen: Dispatch<SetStateAction<boolean>>
}

function NavBar(props: NavBarProps) {
    const [sideMenu, setSideMenu] = useState(false);
    const burger_click = () => {
        setSideMenu(sideMenu => !sideMenu);
        props.setBurgerOpen(sideMenu => !sideMenu);
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
                : <>{menu_items}</>
            }
            <div className="navbar-end">
                <UserIcon />
            </div>
        </nav>
    );
}

export default NavBar