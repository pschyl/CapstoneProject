import './registrationPage.css'
import {ChangeEvent, FormEvent, useState} from "react";
import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export type RegistrationProps = {
    mail: string,
    userName: string,
    password:string
}

export default function RegistrationPage() {

    const [isChecked, setIsChecked] = useState<boolean[]>([true, false])
    const [newRegistration, setNewRegistration] = useState<RegistrationProps>({mail: "", userName:"", password:""})
    const [newUser, setNewUser] = useState<User>({id: "", firstName:"", lastName:"", mail: newRegistration.mail, userName: newRegistration.userName, password: newRegistration.password, role: ""})
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
    const [newShelter, setNewShelter] = useState<Shelter>({id: "", name: "", street: "", postalCode:"", city:"", mail: newRegistration.mail, userName: newRegistration.userName, password: newRegistration.password, role: ""})
    const navigate = useNavigate();

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

    function onSubmitRegister(event: FormEvent<HTMLFormElement>) {
        if (passwordConfirmation !== newRegistration.password) {
            alert("Confirmation doesn't match password")
        } else {
            event.preventDefault()
            console.log("Confirmation does match password")
            if (isChecked[0]) {
                axios.post("api/user", newUser)
                    .then(() => navigate("/login"))
            } else if (isChecked[1]) {
                axios.post("api/shelter", newShelter)
                    .then(() => navigate("/login"))
            }

        }
    }


    return <>
        <div className={"registration_main_container"}>
            <form onSubmit={onSubmitRegister}>
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
                                <input required={true} id={"registration_firstname"} type={"text"} name={"firstName"}
                                       onChange={handleInputChange} value={newUser.firstName}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_lastname"}>Nachname</label>
                                <input required={true} id={"registration_lastname"} type={"text"} name={"lastName"}
                                       onChange={handleInputChange} value={newUser.lastName}/>
                            </li>
                        </div> :
                        <div className={"registration_variable_container"}>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_sheltername"}>Name</label>
                                <input required={true} id={"registration_sheltername"} type={"text"}
                                       placeholder={"Name des Tierheims"} name={"name"} onChange={handleInputChange}
                                       value={newShelter.name}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_street"}>Straße</label>
                                <input required={true} id={"registration_street"} type={"text"} name={"street"}
                                       onChange={handleInputChange} value={newShelter.street}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_postalcode"}>PLZ</label>
                                <input required={true} id={"registration_postalcode"} type={"text"} name={"postalCode"}
                                       onChange={handleInputChange} value={newShelter.postalCode}/>
                            </li>
                            <li className={"registration_list_element"}>
                                <label htmlFor={"registration_city"}>Stadt</label>
                                <input required={true} id={"registration_city"} type={"text"} name={"city"} onChange={handleInputChange}
                                       value={newShelter.city}/>
                            </li>
                        </div>
                    }

                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_mail"}>Email</label>
                        <input required={true} id={"registration_mail"} type={"text"} name={"mail"} onChange={handleInputChange}
                               value={newRegistration.mail}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_username"}>Benutzername</label>
                        <input required={true} id={"registration_username"} type={"text"} placeholder={"mindestens 8 Zeichen"}
                               name={"userName"} onChange={handleInputChange} value={newRegistration.userName}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_password"}>Password</label>
                        <input required={true} id={"registration_password"} type={"password"} placeholder={"mindestens 8 Zeichen"}
                               name={"password"} onChange={handleInputChange} value={newRegistration.password}/>
                    </li>
                    <li className={"registration_list_element"}>
                        <label htmlFor={"registration_confirmation"}>Password nochmals eingeben</label>
                        <input required={true} id={"registration_confirmation"} type={"password"} name={"confirmation"}
                               onChange={handleInputChange} value={passwordConfirmation}/>
                    </li>
                    <button id={"submit_registration"} type={"submit"}>Erstellen</button>
                    <div id={"to_login"}>Bereits registriert? <Link to={"/login"}>Hier</Link> geht's zum Login</div>
                </ul>
            </form>
        </div>
    </>
}