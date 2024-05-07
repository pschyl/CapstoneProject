import websiteLogo from "../assets/logo_mw_small.jpg";
import './LogoLogin.css'

export function LogoLogin() {
    return <div className={"logo_login_container"}>

        <div className={"logo_container"}>
            <img id="website_logo" src={websiteLogo}/>
            <p id={"headline"}>miwau</p>
        </div>

        <div>Login</div>
    </div>
}