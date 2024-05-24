import {Message} from "../model/Message.ts";

export default function MessageCard(props: Readonly<Message>) {
    return <div>
        <div>
            {props.addressee} an {props.recipient}
        </div>
        <div>
            {props.message}
        </div>
    </div>
}