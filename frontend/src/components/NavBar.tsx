import './NavBar.css'
import {Link} from "react-router-dom";

export function NavBar() {
    return <nav>
        <Link className={"navBar_element"} to={"/find"}>Finden</Link>
        <Link className={"navBar_element"} to={"/new"}>Vermitteln</Link>
        <Link className={"navBar_element"} to={"/support"}>Support</Link>
    </nav>
}