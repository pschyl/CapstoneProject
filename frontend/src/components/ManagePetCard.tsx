import {Pet} from "../model/Pet.ts";
import './ManagePetCard.css'
import axios from "axios";
import {ChangeEvent, useState} from "react";

export function ManagePetCard(props:Readonly<Pet>) {

    const [isEdited, setIsEdited] = useState<boolean>(false)
    const [petToEdit, setPetToEdit] = useState<Pet>(props)

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setPetToEdit({...petToEdit, [event.target.name]: event.target.value})
    }


    function deletePet() {
        axios.delete("/api/pets/" + props.id)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error.message))
    }

    function openEditMenu() {
        if (isEdited) {
            setIsEdited(false)
        } else {
            setIsEdited(true)
        }
    }


    function editPet() {
        axios.put("/api/pets/" + props.id, petToEdit)
            .then(() => setIsEdited(false))
            .catch((error) => {console.log(error.message)})

    }



    return <div id={"manage_pet_card" + props.id} className={"manage_pet_card_container"}>
        <div className={"manage_image_container"}><img src={props.images[0]}/></div>
        <div className={"manage_table_container"}>
            <table>
                {!isEdited ?
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>{props.name}</th>
                </tr>
                <tr>
                    <th>Vermittlungstyp</th>
                    <th>{props.type}</th>
                </tr>
                <tr>
                    <th>Geschlecht</th>
                    <th>{props.gender}</th>
                </tr>
                <tr>
                    <th>Alter</th>
                    <th>{props.age}</th>
                </tr>
                <tr>
                    <th>Kastriert</th>
                    <th>{props.castrated}</th>
                </tr>
                <tr>
                    <th>Beschreibung</th>
                    <th>{props.description}</th>
                </tr>
                <tr>
                    <th>Inseriert von</th>
                    <th>{props.shelter.name}</th>
                </tr>
                </tbody>
                    :
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th><input type="text" value={petToEdit.name} name={"name"} onChange={handleInputChange}/></th>
                    </tr>
                    <tr>
                        <th>Vermittlungstyp</th>
                        <th>
                            <select value={petToEdit.type} name={"type"} onChange={handleInputChange}>
                                <option value={""}>-</option>
                                <option value={"Familienmitglied"}>Familienmitglied</option>
                                <option value={"Befristete Pflege"}>Befristete Pflege</option>
                                <option value={"Spazierbegleitung"}>Spazierbegleitung</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Geschlecht</th>
                        <th>
                            <select value={petToEdit.gender} name={"gender"} onChange={handleInputChange}>
                                <option value={""}>-</option>
                                <option value={"Weiblich"}>Weiblich</option>
                                <option value={"Männlich"}>Männlich</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Alter</th>
                        <th>
                            <select value={petToEdit.age} name={"age"} onChange={handleInputChange}>
                                <option value={""}>-</option>
                                <option value={"Jung"}>Jung</option>
                                <option value={"Erwachsen"}>Erwachsen</option>
                                <option value={"Alt"}>Alt</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Kastriert?</th>
                        <th>
                            <select value={petToEdit.castrated} name={"castrated"} onChange={handleInputChange}>
                                <option value={""}>-</option>
                                <option value={"Ja"}>Ja</option>
                                <option value={"Nein"}>Nein</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>Beschreibung</th>
                        <th><textarea id={"input_description"} name={"description"} rows={4} cols={55} maxLength={200} value={petToEdit.description} onChange={handleInputChange}></textarea></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <button onClick={editPet}>Änderungen speichern</button>
                        </th>
                    </tr>
                    </tbody>
                }
            </table>
        </div>
        <div className={"manage_symbol_container"}>
            <div className={"manage_symbol"}>✅</div>
            <div className={"manage_symbol"} onClick={openEditMenu}>✏️</div>
            <div className={"manage_symbol"} onClick={deletePet}>❌</div>
        </div>
    </div>
}