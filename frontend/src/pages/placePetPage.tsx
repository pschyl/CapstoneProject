import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Pet} from "../model/Pet.ts";
import axios from "axios";
import {ManagePetCard} from "../components/ManagePetCard.tsx";
import searchLogo from "../assets/search-icon.webp";
import './placePetPage.css'
import {Shelter} from "../model/Shelter.ts";

export default function PlacePetPage() {

    const shelter:Shelter = {id:"1", name:"Tierheim Berlin", postalCode:"50678"}

    const [petList, setPetList] = useState<Pet[]>([])
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const [newPet, setNewPet] = useState<Pet>({id:"", name:"", type:"", species:"", gender:"", castrated:"", age:"", description:"", images: [], shelter: shelter})
    const [imageToSave, setImageToSave] = useState<string>("")

    function fetchPlacedPets() {
        axios.get("/api/pets")
            .then((response) => {setPetList(
                response.data.filter((pet: Pet) => (pet.shelter.name === shelter.name)))})
            .catch((error) => console.log(error.message))
    }

    function placeNewPet() {
        if (!isAdded) {
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const key = event.target.name
        setNewPet({...newPet, [key]: event.target.value})
        console.log(newPet)
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        setImageToSave(event.target.value)
        console.log(imageToSave)
    }

    function addImageToNewPet(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        newPet.images.push(imageToSave)
        setImageToSave("")
    }


    useEffect(() => {
        fetchPlacedPets()
    }, [petList])


    return <>
        <div className={"add_search_container"}>
            {!isAdded ?
                <button type={"button"} className={"add_pet_button"} onClick={placeNewPet}>+</button>
                :
                <button type={"button"} className={"add_pet_button"}  onClick={placeNewPet}>-</button>
            }
                <form>
                <input type={"text"}/>
                <button type={"button"}><img id={"search_logo"} src={searchLogo}/></button>
            </form>
        </div>
        {isAdded &&
        <form className={"place_pet_form"}>
            <div className={"table_container"}>
                <table>
                    <tbody>
                    <tr>
                        <th className={"first_col"}>Name</th>
                        <th><input onChange={handleInputChange} type={"text"} name={"name"} value={newPet.name}/></th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Sucht nach</th>
                        <th>
                            <input name={"type"} id={"placetype_family"} type={"radio"} onChange={handleInputChange} value={"Familienmitglied"}/>
                            <label htmlFor={"placetype_family"}>Familienmitglied</label>
                        </th>
                        <th>
                            <input name={"type"} id={"placetype_temp"} type={"radio"} onChange={handleInputChange} value={"Befristete Pflege"}/>
                            <label htmlFor={"placetype_temp"}>Befristeter Pflege</label>
                        </th>
                        <th>
                            <input name={"type"} id={"placetype_walk"} type={"radio"} onChange={handleInputChange} value={"Spazierbegleitung"}/>
                            <label htmlFor={"placetype_walk"}>Spazierbegleitung</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Art</th>
                        <th>
                            <input name={"species"} id={"species_cat"} type={"radio"} onChange={handleInputChange} value={"Katze"}/>
                            <label htmlFor={"species_cat"}>Katze</label>
                        </th>
                        <th>
                            <input name={"species"} id={"species_dog"} type={"radio"} onChange={handleInputChange} value={"Hund"}/>
                            <label htmlFor={"species_dog"}>Hund</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Geschlecht</th>
                        <th>
                            <input name={"gender"} id={"gender_female"} type={"radio"} onChange={handleInputChange} value={"Weiblich"}/>
                            <label htmlFor={"gender_female"}>Weiblich</label>
                        </th>
                        <th>
                            <input name={"gender"} id={"gender_male"} type={"radio"} onChange={handleInputChange} value={"Männlich"}/>
                            <label htmlFor={"gender_male"}>Männlich</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Kastriert</th>
                        <th>
                            <input name={"castrated"} id={"castrated_yes"} type={"radio"} onChange={handleInputChange} value={"Ja"}/>
                            <label htmlFor={"castrated_yes"}>Ja</label>
                        </th>
                        <th>
                            <input name={"castrated"} id={"castrated_no"} type={"radio"} onChange={handleInputChange} value={"Nein"}/>
                            <label htmlFor={"castrated_no"}>Nein</label>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Alter</th>
                        <th>
                            <input name={"age"} id={"age_young"} type={"radio"} onChange={handleInputChange} value={"Jung"}/>
                            <label htmlFor={"age_young"}>Jung</label>
                        </th>
                        <th>
                            <input name={"age"} id={"age_adult"} type={"radio"} onChange={handleInputChange} value={"Erwachsen"}/>
                            <label htmlFor={"age_adult"}>Erwachsen</label>
                        </th>
                        <th>
                            <input name={"age"} id={"age_old"} type={"radio"} onChange={handleInputChange} value={"Alt"}/>
                            <label htmlFor={"age_old"}>Alt</label>
                        </th>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    <tr>
                        <th><label className={"first_col"} htmlFor={"input_description"}>Beschreibung</label></th>
                        <th>
                            <textarea id={"input_description"} name={"description"} rows={4} cols={55} maxLength={200} onChange={handleInputChange} value={newPet.description}></textarea>
                        </th>
                    </tr>
                    <tr>
                        <th className={"first_col"}>Fotos</th>
                        <th>
                            <input type={"text"} placeholder={"Dateipfad/URL"} name={"images"} value={imageToSave} onChange={handleImageChange}/>
                            <button type={"submit"} onClick={addImageToNewPet}>Datei hinzufügen</button>
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