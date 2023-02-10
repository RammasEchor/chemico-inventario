import { Dispatch, SetStateAction, useState } from "react";
import { getRoleFromString, useAuth } from "../../login/auth-provider/auth_provider";
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
    const { userRole } = useAuth();
    const burger_click = () => {
        setSideMenu(sideMenu => !sideMenu);
        props.setBurgerOpen(sideMenu => !sideMenu);
    }

    const userVisibility = getRoleFromString(userRole);

    const menu_items = menu_layout.map(topic =>
        topic.visibility <= userVisibility &&
        <DropMenu text={topic.title} key={topic.title}>
            {topic.children.map(item =>
                item.visibility <= userVisibility &&
                <DropMenuItem text={item.title} link={item.link} key={item.title} />
            )}
        </DropMenu>
    );

    return (
        <nav className="navbar">
            <Brand onClick={burger_click} />
            <div className="navbar-menu">
                <div className="navbar-start">
                    {sideMenu
                        ? <VerticalMenu />
                        : <>{menu_items}</>
                    }
                </div>
                <div className="navbar-end">
                    <UserIcon />
                </div>
            </div>
        </nav>
    );
}

export default NavBar