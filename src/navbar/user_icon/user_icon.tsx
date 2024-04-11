import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdCircleNotifications } from "react-icons/md";
import { getPendingQuotes } from "../../apis/api_notificaciones";
import { Role, getUserRoleFromString } from "../../apis/api_usuarios";
import "../../css/inventario.css";
import { useAuth } from "../../login/auth-provider/auth_provider";
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
    const { userKey, userRole, onLogout } = useAuth();

    useEffect(() => {
        const role = getUserRoleFromString(userRole);
        if (role !== Role.Cliente) {
            const interval = setInterval(() => {
                getPendingQuotes(userKey)
                    .then(response => response.json())
                    .then(pending => setIconState({
                        activeIconBadge: true,
                        numberOfQuotes: pending
                    }));
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [userRole, userKey]);

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
                <DropMenuItem
                    text={`Cotizaciones${iconState.numberOfQuotes > 0 ? ` (${iconState.numberOfQuotes})` : ""}`}
                    link="/cotizaciones_por_aprobar"
                />
                <hr className="navbar-divider" />
                <DropMenuItem
                    text="Log Out"
                    link="/"
                    onClick={() => onLogout()}
                />
                <div className="navbar-item">
                    <a
                        href="https://www.thechemicogroup.com/information-statements-and-terms/"
                    >Terminos y Condiciones de Uso</a>
                </div>
            </div>
        </div>
    );
}

export default UserIcon;