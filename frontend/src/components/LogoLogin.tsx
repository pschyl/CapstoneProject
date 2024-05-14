import websiteLogo from "../assets/logo_mw_small.jpg";
import './LogoLogin.css'
import loginLogo from "../assets/userLogo.png";
import {Link} from "react-router-dom";

export function LogoLogin() {
    return <div className={"logo_login_container"}>

        <div className={"logo_container"}>
            <img id="website_logo" src={websiteLogo}/>
            <p id={"headline"}>miwau</p>
        </div>

        <div className={"login_container"}>
            <div><Link id={"registration_link"} to={"/registration"}>Registrieren</Link></div>
            <button id={"login_div"}>
                <img id={"login_logo"} src={loginLogo}/>
            </button>
        </div>
    </div>
}