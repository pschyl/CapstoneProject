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
        <header>
            <div className={"logo_login_container"}>
                <div>Logo</div>
                <div>Login</div>
            </div>
            <div>
                Navbar
            </div>
        </header>
        <main>
            <div className={"inputBar_container"}>
                <form className={"inputBar"}>
                    <input className={"inputBar_element"} type={"text"}/>
                    <select>
                        <option>5km</option>
                        <option>10km</option>
                        <option>20km</option>
                        <option>50km</option>
                    </select>
                </form>
            </div>
            <div className={"petCard_container"}>
                {petList.map((pet: Pet) => (
                    <PetCard id={pet.id} name={pet.name} species={pet.species} images={pet.images} />
                ))}
            </div>
        </main>
        <footer>
            Footer
        </footer>

    </>
  )
}

