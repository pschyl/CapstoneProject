import './NavBar.css'
import {Link} from "react-router-dom";

export function NavBar() {
    return <nav>
        <Link className={"navBar_element"} to={"/"}>Finden</Link>
        <Link className={"navBar_element"} to={"/place"}>Vermitteln</Link>
        <Link className={"navBar_element"} to={"/support"}>Support</Link>
    </nav>
}