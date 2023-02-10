import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdCircleNotifications } from "react-icons/md";
import "../../../css/inventario.css";
import { useAuth } from "../../../login/auth-provider/auth_provider";
import DropMenuItem from "../dropmenu/dropmenuitem";

interface UserIconState {
    activeIconBadge: boolean,
    numberOfQuotes: number
}

function UserIcon() {
    const [iconState, setIconState] = useState<UserIconState>({
        activeIconBadge: false,
        numberOfQuotes: 0
    });
    const { userKey } = useAuth();

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
                navbar-item has-dropdown is-hoverable
            `}
            onClick={() => {
                setIconState(iconState => {
                    const newQuotes = iconState.numberOfQuotes > 0 ? 0 : 1;
                    const updatedValues: UserIconState = {
                        activeIconBadge: !iconState.activeIconBadge,
                        numberOfQuotes: newQuotes
                    }
                    return { ...iconState, ...updatedValues };
                });
            }}
        >
            {/* // Font awesome pixel sizes relative to the multiplier.
            // 1x - 14px
            // 2x - 28px
            // 3x - 42px
            // 4x - 56px
            // 5x - 70px */}
            <BiUserCircle size={42} />
            {iconState.activeIconBadge &&
                <MdCircleNotifications color="red" className="badge" />
            }
            <div className="navbar-link is-arrowless is-size-6">
                {userKey}
            </div>
            <div className="navbar-dropdown is-right">
                {/* <div className="navbar-item">
                    {`Cotizaciones${iconState.numberOfQuotes > 0 ? ` (${iconState.numberOfQuotes})` : ""}`}
                </div> */}
                <DropMenuItem
                    text={`Cotizaciones${iconState.numberOfQuotes > 0 ? ` (${iconState.numberOfQuotes})` : ""}`}
                    link="/status_cotizacion"
                />
                <hr className="navbar-divider" />
                <div className="navbar-item">
                    Log Out
                </div>
            </div>
        </div>
    );
}

export default UserIcon;