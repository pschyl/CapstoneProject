import './registrationPage.css'
import {ChangeEvent, useState} from "react";
import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";

export type RegistrationProps = {
    mail: string,
    userName: string,
    password:string
}

export default function RegistrationPage() {

    const [isChecked, setIsChecked] = useState<boolean[]>([true, false])
    const [newRegistration, setNewRegistration] = useState<RegistrationProps>({mail: "", userName:"", password:""})
    const [newUser, setNewUser] = useState<User>({id: "", firstName:"", lastName:"", mail: newRegistration.mail, userName: newRegistration.userName, password: newRegistration.password})
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
    const [newShelter, setNewShelter] = useState<Shelter>({id: "", name: "", street: "", postalCode:"", city:"", mail: newRegistration.mail, userName: newRegistration.userName, password: newRegistration.password})

    function handleCheckboxChange(checkboxNumber:number) {
        if (checkboxNumber === 0) {
            setIsChecked([true,false])
        } else {
            setIsChecked([false,true])
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        if (key === "confirmation") {
            setPasswordConfirmation(event.target.value)
        } else {
                setNewRegistration({...newRegistration, [key]: event.target.value})
            if (isChecked[0]) {
                setNewUser({...newUser, [key]: event.target.value})
            } else if (isChecked[1]) {
                setNewShelter({...newShelter, [key]: event.target.value})
            }
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
                                <input id={"registration_firstname"} type={"text"} name={"firstName"} onChange={handleInputChange} value={newUser.firstName}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_lastname"}>Nachname</label>
                                <input id={"registration_lastname"} type={"text"} name={"lastName"} onChange={handleInputChange} value={newUser.lastName}/>
                            </li>
                        </div> :
                        <div className={"registration_variable_container"}>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_sheltername"}>Name</label>
                                <input id={"registration_sheltername"} type={"text"}
                                       placeholder={"Name des Tierheims"} name={"name"} onChange={handleInputChange} value={newShelter.name}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_street"}>Straße</label>
                                <input id={"registration_street"} type={"text"} name={"street"} onChange={handleInputChange} value={newShelter.street}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_postalcode"}>PLZ</label>
                                <input id={"registration_postalcode"} type={"text"}  name={"postalCode"} onChange={handleInputChange} value={newShelter.postalCode}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_city"}>Stadt</label>
                                <input id={"registration_city"} type={"text"}  name={"city"} onChange={handleInputChange} value={newShelter.city}/>
                            </li>
                        </div>
                    }

                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_mail"}>Email</label>
                        <input id={"registration_mail"} type={"text"} name={"mail"} onChange={handleInputChange} value={newRegistration.mail}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_username"}>Benutzername</label>
                        <input id={"registration_username"} type={"text"} placeholder={"mindestens 8 Zeichen"} name={"userName"} onChange={handleInputChange} value={newRegistration.userName}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_password"}>Password</label>
                        <input id={"registration_password"} type={"password"} placeholder={"mindestens 8 Zeichen"} name={"password"} onChange={handleInputChange} value={newRegistration.password}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_confirmation"}>Password nochmals eingeben</label>
                        <input id={"registration_confirmation"} type={"password"} name={"confirmation"} onChange={handleInputChange} value={passwordConfirmation}/>
                    </li>
                    <button id={"submit_registration"} type={"submit"}>Weiter</button>
                </ul>
            </form>
        </div>
    </>
}