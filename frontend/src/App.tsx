import './App.css'
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Pet} from "./model/Pet.ts";
import axios from "axios";
import {PetCard} from "./components/PetCard.tsx";
import catLogo from "./assets/cat.blue.svg"
import dogLogo from "./assets/dog.blue.svg"
import filterLogo from "./assets/filter.jpg"
import searchLogo from "./assets/search-icon.webp"
import {LogoLogin} from "./components/LogoLogin.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {FilterObject} from "./model/FilterObject.ts";
import {SearchObject} from "./model/SearchObject.ts";

export default App

function App() {

    const [petList, setPetList] = useState<Pet[]>([])
    const [isChecked, setIsChecked] = useState<boolean[]>([false, false])
    const [filterRole, setFilterRole] = useState<FilterObject>({species: ["cat", "dog"]})
    const [searchInput, setSearchInput] = useState<SearchObject>({searchType: "", location: "", radius: 100})

    function fetchPets() {
        axios.get("/api/pets")
            .then((response) => {
                setPetList(response.data)
            })
            .catch((error) => console.log(error.message))
    }

    function handleCheckboxChange(checkboxNumber:number, checkboxSpecies:string) {
        if (isChecked[checkboxNumber]) {
            setIsChecked({...isChecked, [checkboxNumber] : false})
            filterRole.species.push(checkboxSpecies)
        } else {
            setIsChecked({...isChecked, [checkboxNumber] : true})
            filterRole.species.splice(filterRole.species.indexOf(checkboxSpecies), 1)
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchInput({...searchInput, location: event.target.value})
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        setSearchInput({...searchInput, [event.target.name]: event.target.value})
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(searchInput)
        axios.get(("/api/pets/" + searchInput.location + "/" + searchInput.radius))
            .then((response) => {setPetList(response.data)})
            .catch((error) => console.log(error.message))
    }

    useEffect(() => {
        fetchPets()
    }, [petList])


  return (
    <>
        <header>
            <LogoLogin />
            <NavBar />
        </header>
        <main>
            <div className={"input_container"}>
                <form onSubmit={handleSubmit} className={"input_form"}>
                    <select onChange={handleSelectChange} name={"searchType"} value={searchInput.searchType}>
                        <option>Familienmitglied</option>
                        <option>Befristete Pflege</option>
                        <option>Spazierbegleitung</option>
                    </select>

                    <input onChange={handleInputChange} placeholder={"Wohnort"} className={"inputBar_element"} type={"text"} value={searchInput.location}/>

                    <select onChange={handleSelectChange} name={"radius"} value={searchInput.radius}>
                        <option value={5}>5km</option>
                        <option value={10}>10km</option>
                        <option value={20}>20km</option>
                        <option value={50}>50km</option>
                        <option value={100}>100km</option>
                    </select>

                    <button type={"submit"}><img id={"search_logo"} src={searchLogo}/></button>
                </form>
            </div>
            <div className={"filter_container"}>
                <div className={"species_filter_container"}>
                    <input
                        type={"checkbox"}
                        id={"species_filter_cat"}
                        checked={isChecked[0]}
                        onChange={() => handleCheckboxChange(0, "cat")}
                    />
                    <label htmlFor={"species_filter_cat"}><img id="cat_logo" src={catLogo}/></label>

                    <input
                        type={"checkbox"}
                        id={"species_filter_dog"}
                        checked={isChecked[1]}
                        onChange={() => handleCheckboxChange(1, "dog")}
                    />
                    <label htmlFor={"species_filter_dog"}><img id="dog_logo" src={dogLogo}/></label>
                </div>
                <div>
                    <button><img id="filter_logo" src={filterLogo}/></button>
                </div>
            </div>

            <div className={"petCard_container"}>
                {petList.filter((pet: Pet) => (filterRole.species.includes(pet.species)))
                    .map((pet: Pet) => (
                        <PetCard id={pet.id} name={pet.name} species={pet.species} images={pet.images} shelter={pet.shelter} key={pet.id}/>
                    ))}
            </div>

        </main>
        <footer>
            Footer
        </footer>

    </>
  )
}

