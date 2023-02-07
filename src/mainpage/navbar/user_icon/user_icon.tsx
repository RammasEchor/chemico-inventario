import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";

function UserIcon() {
    const [notification, setNotification] = useState(false);

    return (
        <div className={`
                is-flex
                is-flex-direction-column
                is-justify-content-center
                is-align-items-center
                mr-6
                is-hidden-mobile 
                is-hidden-tablet-only 
                has-text-link
                dropdown
                is-right
                is-hoverable
            `}
            onClick={() => {
                setNotification(notification => !notification);
            }}
        >
            <BiUserCircle size={42} className="dropdown-trigger"/>
            <div>Username</div>
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <p>Test</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserIcon;