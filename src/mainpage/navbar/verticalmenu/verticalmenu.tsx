import { Link } from "react-router-dom";
import menu_layout from "../menu_struct";

function VerticalMenu() {
    const menu_items = menu_layout.map(topic =>
        <>
            <p className="menu-label">{topic.title}</p>
            <ul className="menu-list">
                {topic.children.map(item =>
                    <li key={item.title}><Link to={item.link} key={item.title}>{item.title}</Link></li>
                )}
            </ul>
        </>
    );

    return (
        <aside className="menu pl-5">
            {menu_items}
        </aside>
    );
}

export default VerticalMenu