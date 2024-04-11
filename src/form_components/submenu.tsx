import React, { ComponentPropsWithoutRef } from "react";
import { FaAngleRight } from "react-icons/fa";

interface SubmenuProps extends ComponentPropsWithoutRef<'div'> {
    label: string
}

function Submenu(props: SubmenuProps) {
    return (
        <div className="nested navbar-item dropdown">
            <div className="dropdown-trigger">
                <div aria-haspopup="true" aria-controls="dropdown-menu">
                    <span className="is-flex is-align-items-center">
                        <span>{props.label}</span>
                        <span className="icon has-text-info">
                            <i className="fas fa-angle-right is-flex is-align-items-center">
                                <FaAngleRight size={"1.5em"} />
                            </i>
                        </span>
                    </span>
                </div>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export { Submenu };

