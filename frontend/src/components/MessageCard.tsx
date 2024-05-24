import {Message} from "../model/Message.ts";
import "./MessageCard.css"

export default function MessageCard(props: Readonly<Message>) {
    return <div className={"message_card"}>
        <div>
            {props.timestamp}
        </div>
        <div>
            {props.addressee} an {props.recipient}
        </div>
        <div>
            {props.header}
        </div>
        <div>
            {props.message}
        </div>
    </div>
}