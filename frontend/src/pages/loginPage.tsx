import "./loginPage.css"

export default function LoginPage() {
    return <>
        <div className={"login_main_container"}>
            <form>
                <ul className={"login_list"}>
                    <h2>Login</h2>
                    <li className={"login_list_element"}>
                        <label htmlFor={"mail"}>Email</label>
                        <input id={"mail"} type={"text"}/>
                    </li>
                    <li className={"login_list_element"}>
                        <label htmlFor={"password"}>Password</label>
                        <input id={"password"} type={"password"}/>
                    </li>
                    <button id={"submit_login"} type={"submit"}>Weiter</button>
                </ul>
            </form>
        </div>
    </>
}