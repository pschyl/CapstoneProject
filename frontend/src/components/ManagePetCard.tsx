import {Pet} from "../model/Pet.ts";
import './ManagePetCard.css'

export function ManagePetCard(props:Readonly<Pet>) {




    return <div className={"manage_pet_card_container"}>
        <div className={"manage_image_container"}><img src={props.images[0]}/></div>
        <div>
            <table>
                <tbody>
                <tr>
                    <th>a</th>
                    <th>{props.name}</th>
                </tr>
                <tr>
                    <th>c</th>
                    <th>{props.shelter.name}</th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
}