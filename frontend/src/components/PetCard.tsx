import {Pet} from "../model/Pet.ts";
import './PetCard.css'

export function PetCard(props:Readonly<Pet>) {
    return <div className={"petCard"}>
        <div className={"image_container"}><img src={props.images[0]}/></div>
        <p>{props.name}</p>
    </div>
}