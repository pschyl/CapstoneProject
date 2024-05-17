import {Pet} from "../model/Pet.ts";
import './ManagePetCard.css'
import axios from "axios";
import {useState} from "react";

export function ManagePetCard(props:Readonly<Pet>) {

    const [isEdited, setIsEdited] = useState<boolean>(false)

    function deletePet() {
        axios.delete("/api/pets/" + props.id)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error.message))
    }

    function editPet() {

    }



    return <div className={"manage_pet_card_container"}>
        <div className={"manage_image_container"}><img src={props.images[0]}/></div>
        <div className={"manage_table_container"}>
            <table>
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
                    <th>Kastriert?</th>
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
            </table>
        </div>
        <div className={"manage_symbol_container"}>
            <div className={"manage_symbol"}>✅</div>
            <div className={"manage_symbol"} onClick={editPet}>✏️</div>
            <div className={"manage_symbol"} onClick={deletePet}>❌</div>
        </div>
    </div>
}