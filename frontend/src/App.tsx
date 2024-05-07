import './App.css'
import {useEffect, useState} from "react";
import {Pet} from "./model/Pet.ts";
import axios from "axios";
import {PetCard} from "./components/PetCard.tsx";

export default App

function App() {

    const [petList, setPetList] = useState<Pet[]>([])

    function fetchPets() {
        axios.get("/api/pets")
            .then((response) => {
                setPetList(response.data)
            })
            .catch((error) => console.log(error.message))
    }

    useEffect(() => {
        fetchPets()
    }, [petList])


  return (
    <>
        {petList.map((pet: Pet) => (
        <PetCard id={pet.id} name={pet.name} species={pet.species} images={pet.images} />
        ))}
    </>
  )
}

