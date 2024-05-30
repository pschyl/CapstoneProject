import "./loginPage.css"
import {FormEvent, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";


type LoginPageProps = {
    setUser: (user:User) => void
    setShelter: (shelter: Shelter) => void
}

export default function LoginPage(props: LoginPageProps) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then(response => { if(response.data.user !== null) {props.setUser(response.data.user)}
    else {props.setShelter(response.data.shelter)}})
            .then(() => navigate("/"))
            .catch(e => console.log(e.response))
    }



    return <>
        <div className={"login_main_container"}>
            <form onSubmit={onSubmitLogin}>
                <ul className={"login_list"}>
                    <h2>Login</h2>
                    <li className={"login_list_element"}>
                        <label htmlFor={"username"}>Username</label>
                        <input id={"username"} type={"text"} onChange={e => setUsername(e.target.value)}
                               value={username}/>
                    </li>
                    <li className={"login_list_element"}>
                        <label htmlFor={"password"}>Password</label>
                        <input id={"password"} type={"password"} onChange={e => setPassword(e.target.value)}
                               value={password}/>
                    </li>
                    <button id={"submit_login"} type={"submit"}>Login</button>
                    <div id={"to_login"}>Noch keinen Account? <Link to={"/registration"}>Hier</Link> registrieren.</div>
                </ul>
            </form>
        </div>
    </>
}