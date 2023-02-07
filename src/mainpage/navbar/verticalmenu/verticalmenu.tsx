import React from "react";
import { Link } from "react-router-dom";
import menu_layout from "../menu_struct";

function VerticalMenu() {
    const menu_items = menu_layout.map((topic, index) =>
        <React.Fragment key={topic.title + index}>
            <p className="menu-label" key={topic.title}>{topic.title}</p>
            <ul className="menu-list" key={index}>
                {topic.children.map(item =>
                    <li key={item.title}>
                        <Link to={item.link} key={topic.title + item.title}>
                            {item.title}
                        </Link>
                    </li>
                )}
            </ul>
        </React.Fragment>
    );

    return (
        <aside className="menu pl-5">
            {menu_items}
        </aside>
    );
}

export default VerticalMenu