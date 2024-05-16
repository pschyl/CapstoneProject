import {useEffect, useState} from "react";
import {Pet} from "../model/Pet.ts";
import axios from "axios";
import {ManagePetCard} from "../components/ManagePetCard.tsx";
import searchLogo from "../assets/search-icon.webp";
import './placePetPage.css'

export default function PlacePetPage() {

    const [petList, setPetList] = useState<Pet[]>([])
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const shelterName:string = "Tierheim Berlin";

    function fetchPlacedPets() {
        axios.get("/api/pets")
            .then((response) => {setPetList(
                response.data.filter((pet: Pet) => (pet.shelter.name === shelterName)))})
            .catch((error) => console.log(error.message))
    }

    function placeNewPet() {
        if (!isAdded) {
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    }

    useEffect(() => {
        fetchPlacedPets()
    }, [petList])


    return <>
        <div className={"add_search_container"}>
            {!isAdded ?
                <button className={"add_pet_button"} onClick={placeNewPet}>+</button>
                :
                <button className={"add_pet_button"}  onClick={placeNewPet}>-</button>
            }
                <form>
                <input type={"text"}/>
                <button><img id={"search_logo"} src={searchLogo}/></button>
            </form>
        </div>
        {isAdded &&
        <form className={"place_pet_form"}>
            <div className={"table_container"}>
                <table>
                    <tbody>
                    <tr>
                        <th className={"first_col"}>Name</th>
                        <th><input type={"text"}/></th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Sucht nach</th>
                        <th>
                            <input id={"placetype_family"} type={"checkbox"}/>
                            <label htmlFor={"placetype_family"}>Familienmitglied</label>
                        </th>
                        <th>
                            <input id={"placetype_temp"} type={"checkbox"}/>
                            <label htmlFor={"placetype_temp"}>Befristeter Pflege</label>
                        </th>
                        <th>
                            <input id={"placetype_walk"} type={"checkbox"}/>
                            <label htmlFor={"placetype_walk"}>Spazierbegleitung</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Art</th>
                        <th>
                            <input id={"species_cat"} type={"checkbox"}/>
                            <label htmlFor={"species_cat"}>Katze</label>
                        </th>
                        <th>
                            <input id={"species_dog"} type={"checkbox"}/>
                            <label htmlFor={"species_dog"}>Hund</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Geschlecht</th>
                        <th>
                            <input id={"sex_female"} type={"checkbox"}/>
                            <label htmlFor={"sex_female"}>Weiblich</label>
                        </th>
                        <th>
                            <input id={"sex_male"} type={"checkbox"}/>
                            <label htmlFor={"sex_male"}>Männlich</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Kastriert</th>
                        <th>
                            <input id={"castrated_yes"} type={"checkbox"}/>
                            <label htmlFor={"castrated_yes"}>Ja</label>
                        </th>
                        <th>
                            <input id={"castrated_no"} type={"checkbox"}/>
                            <label htmlFor={"castrated_no"}>Nein</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Alter</th>
                        <th>
                            <input id={"age_young"} type={"checkbox"}/>
                            <label htmlFor={"age_young"}>Jung</label>
                        </th>
                        <th>
                            <input id={"age_adult"} type={"checkbox"}/>
                            <label htmlFor={"age_adult"}>Erwachsen</label>
                        </th>
                        <th>
                            <input id={"age_old"} type={"checkbox"}/>
                            <label htmlFor={"age_old"}>Alt</label>
                        </th>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <label className={"first_col"} htmlFor={"input_description"}>Beschreibung</label>
                        <th><textarea id={"input_description"} rows={4} cols={55} maxLength={200}></textarea></th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Fotos</th>
                        <th>
                            <input type={"text"} placeholder={"Dateipfad/URL"}/>
                            <button>Datei hinzufügen</button>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id={"place_pet_button_container"}>
                <button>Zuhause suchen</button>
            </div>
        </form>
        }
        <div className={"card_container"}>
            {petList.map((pet: Pet) => (
                <ManagePetCard id={pet.id} name={pet.name} species={pet.species} shelter={pet.shelter}
                               images={pet.images} key={pet.id}/>
            ))}
        </div>

    </>
}