import {Pet} from "../model/Pet.ts";
import './ManagePetCard.css'

export function ManagePetCard(props:Readonly<Pet>) {




    return <div className={"manage_pet_card_container"}>
        <div className={"manage_image_container"}><img src={props.images[0]}/></div>
        <div className={"manage_table_container"}>
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>{props.name}</th>
                </tr>
                <tr>
                    <th>Inseriert von </th>
                    <th>{props.shelter.name}</th>
                </tr>
                </tbody>
            </table>
        </div>
        <div className={"manage_symbol_container"}>
            <div className={"manage_symbol"}>✅</div>
            <div className={"manage_symbol"}>✏️</div>
            <div className={"manage_symbol"}>❌</div>
        </div>
    </div>
}