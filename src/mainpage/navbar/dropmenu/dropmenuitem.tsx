import { Link } from "react-router-dom";

interface props {
    text: string
    link?: string
    key?: string
}

function DropMenuItem(props: props) {
    const link = props.link ? props.link : "/"

    return (
        <Link className="navbar-item" to={link}>
            {props.text}
        </Link>
    );
}

export default DropMenuItem