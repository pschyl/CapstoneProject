import "./loginPage.css"

export default function LoginPage() {
    return <>
        <div className={"login_main_container"}>
            <form>
                <ul>
                    <h2>Login</h2>
                    <li>
                        <label htmlFor={"mail"}>Email</label>
                        <input id={"mail"} type={"text"}/>
                    </li>
                    <li>
                        <label htmlFor={"password"}>Password</label>
                        <input id={"password"} type={"password"}/>
                    </li>
                    <button id={"submit_login"} type={"submit"}>Weiter</button>
                </ul>
            </form>
        </div>
    </>
}