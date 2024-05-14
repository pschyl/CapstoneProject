import {Pet} from "../model/Pet.ts";
import './PetCard.css'
import {useNavigate} from "react-router-dom";

export function PetCard(props:Readonly<Pet>) {

    const navigate = useNavigate()
    function showDetails() {
        navigate("/find/" + props.id)
    }

    return <div className={"petCard"}>
        <div className={"image_container"}><img onClick={showDetails} src={props.images[0]}/></div>
        <div className={"cardInformation"}>
            <div id={"name"}>{props.name}</div>
            <div id={"shelter_name"}>{props.shelter.name}</div>
        </div>
    </div>
}