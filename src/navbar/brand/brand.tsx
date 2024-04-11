import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";

interface props {
    onClick: () => void;
}

function Brand(props: props) {
    const [isBurgerSelected, setIsBurgerSelected] = useState(false)

    const burgerSelected = () => {
        props.onClick()
        setIsBurgerSelected(!isBurgerSelected);
    }

    return (
        <div className="navbar-brand">
            <Link className="p-5" to="/">
                <img src={logo} alt="Logo" width={130} height={50} />
            </Link>

            <span onClick={burgerSelected} role="button" className={
                isBurgerSelected
                    ? "has-background-info-light mr-5 mt-5 navbar-burger"
                    : "has-background-white mr-5 mt-5 navbar-burger"
            } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </span>
        </div>
    );
}

export default Brand