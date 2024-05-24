import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";
import {useEffect, useState} from "react";
import {Message} from "../model/Message.ts";
import axios from "axios";
import MessageCard from "../components/MessageCard.tsx";

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

    useEffect(() => {
        fetchMessages()
    }, [])


    return <>
        <div>
            <button>Empfangen</button>
            <button>Gesendet</button>
        </div>
        <div>
            Nachrichten für {username}:
            <div>
                {messageList.map((message:Message) =>(
                    <MessageCard id={message.id} addressee={message.addressee} recipient={message.recipient} message={message.message} timestamp={message.timestamp} key={message.id}/>
                ))}
            </div>
        </div>
    </>
}