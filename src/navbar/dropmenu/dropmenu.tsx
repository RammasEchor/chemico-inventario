
interface props {
    text: string,
    children?: React.ReactNode
}

function DropMenu(props: props) {
    return (
        <div className="navbar-menu">
            <div className="navbar-item has-dropdown is-hoverable">
                <span className="navbar-link">
                    {props.text}
                </span>
                <div className="navbar-dropdown">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default DropMenu