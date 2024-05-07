import {Pet} from "../model/Pet.ts";
import './PetCardCSS.css'

export function PetCard(props:Readonly<Pet>) {
    return <div className={"petCard"}>
        <img src={props.images[0]}/>
        <p>{props.name}</p>
    </div>
}