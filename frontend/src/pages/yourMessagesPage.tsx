import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";

type MessagesProps = {
    shelter:Shelter
    user: User
}

export default function YourMessagesPage(props: MessagesProps) {

    return <>
    your messages
    </>
}