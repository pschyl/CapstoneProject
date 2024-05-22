import websiteLogo from "../assets/logo_mw_small.jpg";
import './LogoLogin.css'
import loginLogo from "../assets/userLogo.png";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

type LogoLoginProps = {
    user:string;
}

export function LogoLogin(props: LogoLoginProps) {

    const navigate = useNavigate()

    function toProfile() {
        navigate("/login")
    }

    return <div className={"logo_login_container"}>

        <div className={"logo_container"} onClick={() => navigate("/")}>
            <img id="website_logo" src={websiteLogo}/>
            <p id={"headline"}>miwau</p>
        </div>

        <div className={"login_container"}>

            <div>
                {props.user === "anonymousUser" ?
                    <Link id={"registration_link"} to={"/registration"}>Registrieren</Link>
                    :
                    <div>{props.user}</div>
                }
            </div>

            <button id={"login_div"} onClick={toProfile}>
                <img id={"login_logo"} src={loginLogo}/>
            </button>
        </div>
    </div>
}