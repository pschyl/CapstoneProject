import {useEffect, useState} from "react";
import {Pet} from "../model/Pet.ts";
import axios from "axios";
import {ManagePetCard} from "../components/ManagePetCard.tsx";

export default function PlacePetPage() {

    const [petList, setPetList] = useState<Pet[]>([])
    const shelterName:string = "Tierheim Berlin";

    function fetchPlacedPets() {
        axios.get("/api/pets")
            .then((response) => {setPetList(
                response.data.filter((pet: Pet) => (pet.shelter.name === shelterName)))})
            .catch((error) => console.log(error.message))
    }

    useEffect(() => {
        fetchPlacedPets()
    }, [petList])


    return <>
        {petList.map((pet: Pet) => (
            <ManagePetCard id={pet.id} name={pet.name} species={pet.species} shelter={pet.shelter} images={pet.images} key={pet.id} />
            ))}
    </>
}