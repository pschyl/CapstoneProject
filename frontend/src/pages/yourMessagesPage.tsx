import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";
import {useState} from "react";
import {Message} from "../model/Message.ts";
import axios from "axios";

type MessagesProps = {
    shelter:Shelter
    user: User
}

export default function YourMessagesPage(props: MessagesProps) {

    const [username, setUsername] = useState<string>(props.user.userName + props.shelter.userName)
    const [messageList, setMessageList] = useState<Message[]>([])

    function fetchMessages() {
        axios.get("/api/messages/" + username)
            .then(response => setMessageList(response.data))
            .catch(e => console.log(e.message))
    }

    return <>
        Nachrichten für {username}:
    your messages
    </>
}