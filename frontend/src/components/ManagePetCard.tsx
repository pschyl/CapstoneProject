import {Pet} from "../model/Pet.ts";

export function ManagePetCard(props:Readonly<Pet>) {




    return <div className={"manage_pet_card_container"}>
        <div><img src={props.images[0]}/></div>
        <div>
            <div>{props.name}</div>
            <div>{props.shelter.name}</div>
        </div>
    </div>
}