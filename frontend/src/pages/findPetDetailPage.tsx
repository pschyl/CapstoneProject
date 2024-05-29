import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Pet} from "../model/Pet.ts";
import './findPetDetailPage.css'
import {Shelter} from "../model/Shelter.ts";
import {User} from "../model/User.ts";
import {NewMessage} from "../components/NewMessage.tsx";

type findPetDetailProps = {
    shelter:Shelter
    user: User
}

export default function FindPetDetailPage(props: findPetDetailProps) {

    const params = useParams()
    const [selectedPet, setSelectedPet] = useState<Pet>()
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)

    function fetchPetById(){
        axios.get("/api/pets/" + params.id)
            .then((response) => setSelectedPet(response.data))
            .catch((error) => console.log(error.message))
    }

    useEffect(() => {fetchPetById()}, [])

    return (<>

        {popupIsOpen && <div className={"new_message_container"}><NewMessage setPopup={setPopupIsOpen}
                                                                             username={props.shelter.userName + props.user.userName}
                                                                             recipient={selectedPet?.shelter.userName + ""} header={selectedPet?.name + ":"}/></div>}
        <div className={"detail_container"}>
            <div className={"detail_image_container"}>
                <img src={selectedPet?.images[0]}/>
            </div>
            <div className={"info_container"}>
                <table className={"detail_table"}>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>{selectedPet?.name}</th>
                    </tr>
                    <tr>
                        <th>Vermittlungstyp</th>
                        <th>{selectedPet?.type}</th>
                    </tr>
                    <tr>
                        <th>Geschlecht</th>
                        <th>{selectedPet?.gender}</th>
                    </tr>
                    <tr>
                        <th>Alter</th>
                        <th>{selectedPet?.age}</th>
                    </tr>
                    <tr>
                        <th>Kastriert</th>
                        <th>{selectedPet?.castrated}</th>
                    </tr>
                    <tr>
                        <th>Beschreibung</th>
                        <th>{selectedPet?.description}</th>
                    </tr>
                    </tbody>
                </table>
                <table className={"detail_table"}>
                    <tbody>
                    <tr>
                        <th>Inseriert von</th>
                        <th>{selectedPet?.shelter.name} ({selectedPet?.shelter.userName})</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>{selectedPet?.shelter.street}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>{selectedPet?.shelter.postalCode} {selectedPet?.shelter.city}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>{selectedPet?.shelter.mail}</th>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <p><button id={"send_message"} onClick={() => setPopupIsOpen(true)}>✉️</button> Anfrage senden</p>
                </div>
            </div>
        </div>
    </>)
}