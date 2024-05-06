import {Pet} from "../model/Pet.ts";

export function PetCard(props:Readonly<Pet>) {
    return <div>
        <img src={props.images[0]}/>
        <p>{props.name}</p>
    </div>
}