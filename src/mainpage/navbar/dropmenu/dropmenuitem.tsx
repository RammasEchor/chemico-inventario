interface props {
    text: string
    link?: string
}

function DropMenuItem(props: props) {
    return (
        <a className="navbar-item" href={props.link}>
            {props.text}
        </a>
    );
}

export default DropMenuItem