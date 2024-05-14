import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Pet} from "../model/Pet.ts";
import './findPetDetailPage.css'

export default function FindPetDetailPage() {

    const params = useParams()
    const [selectedPet, setSelectedPet] = useState<Pet>()

    function fetchPetById(){
        axios.get("/api/pets/" + params.id)
            .then((response) => setSelectedPet(response.data))
            .catch((error) => console.log(error.message))
    }

    useEffect(() => {fetchPetById()}, [])

    return <>
        <div className={"detail_container"}>
            <div className={"detail_image_container"}>
                <img src={selectedPet?.images}/>
            </div>
            <div className={"info_container"}>
                <ul>
                    <li>{selectedPet?.name}</li>
                    <li>{selectedPet?.species}</li>
                </ul>
            </div>
        </div>
        <div className={"contact_container"}>
            <div>
                <ul>
                    <li>{selectedPet?.shelter.name}</li>
                    <li>{selectedPet?.shelter.postalCode}</li>
                </ul>
            </div>
            <button>Nachricht an Tierheim senden</button>
        </div>
    </>
}