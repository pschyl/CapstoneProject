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
    const [isChecked, setIsChecked] = useState<boolean[]>([true, false])

    const navigate = useNavigate()

    function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (isChecked) {
            axios.post("/api/user/login", undefined, {auth: {username, password}})
                .then(response => props.setUser(response.data))
                .then(() => navigate("/"))
        } else {
            axios.post("/api/shelter/login", undefined, {auth: {username, password}})
                .then(response => props.setUser(response.data))
                .then(() => navigate("/"))
        }
    }

    function handleCheckboxChange(checkboxNumber:number) {
        if (checkboxNumber === 0) {
            setIsChecked([true,false])
        } else {
            setIsChecked([false,true])
        }
    }


    return <>
        <div className={"login_main_container"}>
            <form onSubmit={onSubmitLogin}>
                <ul className={"login_list"}>
                    <h2>Login</h2>
                    <li className={"registration_choice_container"}>
                        <input
                            type={"checkbox"}
                            id={"registration_private"}
                            checked={isChecked[0]}
                            onChange={() => handleCheckboxChange(0)}
                        />
                        <label className={"registration_choice_element"} htmlFor={"registration_private"}>Privat</label>

                        <input
                            type={"checkbox"}
                            id={"registration_shelter"}
                            checked={isChecked[1]}
                            onChange={() => handleCheckboxChange(1)}
                        />
                        <label className={"registration_choice_element"}
                               htmlFor={"registration_shelter"}>Tierheim</label>
                    </li>
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