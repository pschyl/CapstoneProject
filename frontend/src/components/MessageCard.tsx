import {Message} from "../model/Message.ts";
import "./MessageCard.css"
import {useState} from "react";
import arrowdown from '../assets/arrowdown.png'
import arrowup from '../assets/arrowup.png'

export default function MessageCard(props: Readonly<Message>) {

    const [showDetails, setShowDetails] = useState<boolean>(false)




    return <div className={"message_card"}>
        <div className={"header_container"}>
            <div>
                {props.addressee} ✉️ {props.recipient}
            </div>
            <div>
                {props.timestamp}
            </div>
        </div>
        <div className={"header_container"}>
            <div>Betreff: {props.header}</div>
        </div>
        {showDetails &&
            <div>
                {props.message}
            </div>
        }
        {!showDetails ?
            <div id={"arrow_container"}>
                <button onClick={() => setShowDetails(true)}><img src={arrowdown}/></button>
            </div>
            :
            <div id={"arrow_container"}>
                <button onClick={() => setShowDetails(false)}><img src={arrowup}/></button>
            </div>
        }

    </div>
}