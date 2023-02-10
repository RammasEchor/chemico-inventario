import { Link } from "react-router-dom";

interface props {
    text: string
    link?: string
    onClick?: () => void
}

function DropMenuItem(props: props) {
    const link = props.link ? props.link : "/"

    return (
        <Link className="navbar-item" to={link} onClick={props.onClick}>
            {props.text}
        </Link>
    );
}

export default DropMenuItem