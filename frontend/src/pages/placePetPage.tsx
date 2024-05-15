import {useEffect, useState} from "react";
import {Pet} from "../model/Pet.ts";
import axios from "axios";
import {ManagePetCard} from "../components/ManagePetCard.tsx";
import searchLogo from "../assets/search-icon.webp";
import './placePetPage.css'

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
        <div className={"add_search_container"}>
            <button>Place New Pet</button>
            <form>
                <input type={"text"}/>
                <button><img id={"search_logo"} src={searchLogo}/></button>
            </form>
        </div>
        <div>
            just opens when you want to add
        </div>
        <div className={"card_container"}>
            {petList.map((pet: Pet) => (
                <ManagePetCard id={pet.id} name={pet.name} species={pet.species} shelter={pet.shelter} images={pet.images} key={pet.id} />
            ))}
        </div>

    </>
}