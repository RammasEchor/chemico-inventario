import React, { Dispatch, SetStateAction, useState } from "react";
import { getUserRoleFromString } from "../apis/api_usuarios";
import { Submenu } from "../form_components/submenu";
import { useAuth } from "../login/auth-provider/auth_provider";
import menu_layout from "../menus/menu_struct";
import Brand from "./brand/brand";
import DropMenu from "./dropmenu/dropmenu";
import DropMenuItem from "./dropmenu/dropmenuitem";
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

    const userVisibility = getUserRoleFromString(userRole);

    const menu_items = menu_layout.map(topic => {
        if (topic.visibility.includes(userVisibility))
            return (
                <DropMenu text={topic.title} key={topic.title}>
                    {topic.children.map(item => {
                        if ('children' in item && item.visibility.includes(userVisibility)) {
                            return (
                                <Submenu label={item.title} key={item.title}>
                                    {item.children?.map(subitem =>
                                        subitem.visibility.includes(userVisibility) &&
                                        <DropMenuItem text={subitem.title} link={subitem.link} key={subitem.title} />
                                    )}
                                </Submenu>
                            );
                        }
                        else {
                            return (
                                item.visibility.includes(userVisibility) &&
                                <DropMenuItem text={item.title} link={item.link} key={item.title} />
                            );
                        }
                    })}
                </DropMenu>
            );

        return <React.Fragment key={topic.title}/>
    });

    return (
        <nav className="navbar">
            <Brand onClick={burger_click} />
            {sideMenu && <VerticalMenu />}
            <div className="navbar-menu">
                <div className="navbar-start">
                    {!sideMenu && <>{menu_items}</>}
                </div>
                <div className="navbar-end">
                    <UserIcon />
                </div>
            </div>
        </nav>
    );
}

export default NavBar