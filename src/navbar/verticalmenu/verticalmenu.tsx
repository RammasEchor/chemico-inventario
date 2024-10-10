import React from "react";
import { Link } from "react-router-dom";
import { getUserRoleFromString } from "../../apis/api_usuarios";
import { useAuth } from "../../login/auth-provider/auth_provider";
import menu_layout from "../../menus/menu_struct";

function VerticalMenu() {
  const { onLogout, userRole } = useAuth();

  const userVisibility = getUserRoleFromString(userRole);

  const menu_items = menu_layout.map((topic, index) => {
    if (!topic.visibility.includes(userVisibility))
      return <React.Fragment key={topic.title + index}></React.Fragment>;

    return (
      <React.Fragment key={topic.title + index}>
        <p className="menu-label" key={topic.title}>
          {topic.title}
        </p>
        <ul className="menu-list" key={index}>
          {topic.children.map((item) => {
            if (!item.visibility.includes(userVisibility))
              return <React.Fragment key={item.title} />;

            if ("children" in item) {
              return item.children?.map((subitem) => (
                <li key={subitem.title}>
                  <Link to={subitem.link} key={topic.title + subitem.title}>
                    {subitem.title}
                  </Link>
                </li>
              ));
            } else {
              return (
                <li key={item.title}>
                  <Link to={item.link} key={topic.title + item.title}>
                    {item.title}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </React.Fragment>
    );
  });

  return (
    <aside className="menu pl-5">
      {menu_items}
      <hr />
      <ul className="menu-list mb-5">
        <li>
          <Link to="/" onClick={() => onLogout()}>
            Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default VerticalMenu;
