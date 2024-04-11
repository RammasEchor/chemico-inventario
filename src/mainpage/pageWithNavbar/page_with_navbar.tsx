import { PropsWithChildren, useState } from "react";
import NavBar from "../../navbar/navbar";

function PageWithNavbar(props: PropsWithChildren) {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    return (
        <>
            <NavBar setBurgerOpen={setBurgerMenuOpen} />
            {!burgerMenuOpen && props.children}
        </>
    );
}

export default PageWithNavbar