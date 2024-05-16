import './registrationPage.css'
import {useState} from "react";

export default function RegistrationPage() {

    const [isChecked, setIsChecked] = useState<boolean[]>([true, false])

    function handleCheckboxChange(checkboxNumber:number) {
        if (checkboxNumber === 0) {
            setIsChecked([true,false])
        } else {
            setIsChecked([false,true])
        }
    }

    return <>
        <div className={"registration_main_container"}>
            <form>
                <ul className={"registration_list"}>
                    <h2>Account erstellen</h2>
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
                    {isChecked[0] ?
                        <div className={"registration_variable_container"}>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_firstname"}>Vorname</label>
                                <input id={"registration_firstname"} type={"text"}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_lastname"}>Nachname</label>
                                <input id={"registration_lastname"} type={"text"}/>
                            </li>
                        </div> :
                        <div className={"registration_variable_container"}>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_sheltername"}>Name</label>
                                <input id={"registration_sheltername"} type={"text"}
                                       placeholder={"Name des Tierheims"}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_street"}>Straße</label>
                                <input id={"registration_street"} type={"text"}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_postalcode"}>PLZ</label>
                                <input id={"registration_postalcode"} type={"text"}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_city"}>Stadt</label>
                                <input id={"registration_city"} type={"text"}/>
                            </li>
                        </div>
                    }

                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_mail"}>Email</label>
                        <input id={"registration_mail"} type={"text"}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_username"}>Benutzername</label>
                        <input id={"registration_username"} type={"text"} placeholder={"mindestens 8 Zeichen"}/>
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