import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Pet} from "../model/Pet.ts";
import {FilterObject} from "../model/FilterObject.ts";
import {SearchObject} from "../model/SearchObject.ts";
import axios from "axios";
import searchLogo from "../assets/search-icon.webp";
import catLogo from "../assets/cat.blue.svg";
import dogLogo from "../assets/dog.blue.svg";
import filterLogo from "../assets/filter.jpg";
import {PetCard} from "../components/PetCard.tsx";
import arrowleft from "../assets/arrowleft.png"
import arrowright from "../assets/arrowright.png"
import {Pagination} from "../components/Pagination.tsx";

export default function FindPetPage() {
    const [petList, setPetList] = useState<Pet[]>([])
    const [isChecked, setIsChecked] = useState<boolean[]>([false, false])
    const [filterRole, setFilterRole] = useState<FilterObject>({species: ["Hund", "Katze"]})
    const [searchInput, setSearchInput] = useState<SearchObject>({searchType: "Familienmitglied", location: "", radius: 20})
    const [searchStatus, setSearchStatus] = useState<boolean>(false)
    const [lastSearchValue, setLastSearchValue] = useState<SearchObject>({searchType: "", location: "", radius: 0})
    const [activePage, setActivePage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    const perPage:number = 4
    const start:number = (activePage - 1) * perPage
    const end:number = start + perPage
    const pagedData = petList.slice(start,end)



    function fetchPets() {
        axios.get("/api/pets")
            .then((response) => {
                setPetList(response.data)
                setTotalPages(Math.ceil(response.data.length/perPage))
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

    function previousPage() {
        if (activePage !== 1) {
            setActivePage(activePage - 1)
        }
    }

    function nextPage() {
        if (activePage * perPage < petList.length) {
            setActivePage(activePage + 1)
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
        axios.get(("/api/pets/" + searchInput.searchType + "/" + searchInput.location + "/" + searchInput.radius))
            .then((response) => {setPetList(response.data)})
            .catch((error) => console.log(error.message))
        setSearchStatus(true)
        setLastSearchValue(searchInput)
    }

    function resetSearch() {
        setSearchStatus(false)
        setSearchInput({searchType: "Familienmitglied", location: "", radius: 20})
        fetchPets()
    }

    useEffect(() => {
        fetchPets()
    }, [])


    return <>
        <div className={"input_container"}>
            <form onSubmit={handleSubmit} className={"input_form"}>
                <select onChange={handleSelectChange} name={"searchType"} value={searchInput.searchType}>
                    <option>Familienmitglied</option>
                    <option>Befristete Pflege</option>
                    <option>Spazierbegleitung</option>
                </select>

                <input onChange={handleInputChange} placeholder={"Wohnort"} className={"inputBar_element"} type={"text"}
                       value={searchInput.location}/>

                <select onChange={handleSelectChange} name={"radius"} value={searchInput.radius}>
                    <option value={5}>5km</option>
                    <option value={10}>10km</option>
                    <option value={20}>20km</option>
                    <option value={50}>50km</option>
                    <option value={100}>100km</option>
                </select>

                <button type={"submit"}><img id={"search_logo"} src={searchLogo}/></button>
            </form>
            {searchStatus &&
                <div
                    id={"active_search"}>{lastSearchValue.searchType}, {lastSearchValue.location}, {lastSearchValue.radius}km <button
                    onClick={resetSearch}>❌</button></div>
            }
        </div>

        <div className={"filter_container"}>
            <div className={"species_filter_container"}>
                <input
                    type={"checkbox"}
                    id={"species_filter_cat"}
                    checked={isChecked[0]}
                    onChange={() => handleCheckboxChange(0, "Katze")}
                />
                <label htmlFor={"species_filter_cat"}><img id="cat_logo" src={catLogo}/></label>

                <input
                    type={"checkbox"}
                    id={"species_filter_dog"}
                    checked={isChecked[1]}
                    onChange={() => handleCheckboxChange(1, "Hund")}
                />
                <label htmlFor={"species_filter_dog"}><img id="dog_logo" src={dogLogo}/></label>
            </div>
            <div>
                <button><img id="filter_logo" src={filterLogo}/></button>
            </div>
        </div>

        <div className={"petCard_container"}>
            {petList.length ? pagedData.filter((pet: Pet) => (filterRole.species.includes(pet.species)))
                    .map((pet: Pet) => (
                        <PetCard id={pet.id} name={pet.name} type={pet.type} gender={pet.gender} age={pet.age} castrated={pet.castrated} description={pet.description} species={pet.species} shelter={pet.shelter}
                                 images={pet.images} key={pet.id}/>
                    ))
                : <div id={"no_result"}>
                    <div>keine Einträge gefunden</div>
                </div>}
        </div>
        <div className={"selectPage"}>
            <div>{activePage !== 1 && <button onClick={previousPage}><img src={arrowleft} alt={"arrow_left"}/></button>}</div>
            <div>{Array.from(Array(totalPages).keys()).map((entry) =>
                <Pagination activePage={activePage} thisPage={entry + 1} key={entry} />
            )}</div>
            <div>{(activePage * perPage < petList.length) && <button onClick={nextPage}><img src={arrowright} alt={"arrow_right"}/></button>}</div>
        </div>
    </>

}