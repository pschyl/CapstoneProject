import './registrationPage.css'

export default function RegistrationPage() {

    return <>
        <div className={"registration_main_container"}>
            <form>
                <ul className={"registration_list"}>
                    <h2>Account erstellen</h2>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_firstname"}>Vorname</label>
                        <input id={"registration_firstname"} type={"text"}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_lastname"}>Nachname</label>
                        <input id={"registration_lastname"} type={"text"} placeholder={"Nachname"}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_mail"}>Email</label>
                        <input id={"registration_mail"} type={"text"}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_password"}>Password</label>
                        <input id={"registration_password"} type={"password"} placeholder={"mindestens 8 Zeichen"}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_confirmation"}>Password nochmals eingeben</label>
                        <input id={"registration_confirmation"} type={"password"}/>
                    </li>
                    <button id={"submit_registration"} type={"submit"}>Weiter</button>
                </ul>
            </form>
        </div>
    </>
}