import "./loginPage.css"
import {FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


type LoginPageProps = {
    setUser: (user:string) => void
}

export default function LoginPage(props: LoginPageProps) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then(response => props.setUser(response.data))
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
                </ul>
            </form>
        </div>
    </>
}