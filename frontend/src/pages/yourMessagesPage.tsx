import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";
import {useEffect, useState} from "react";
import {Message} from "../model/Message.ts";
import axios from "axios";
import MessageCard from "../components/MessageCard.tsx";
import catLogo from "../assets/cat.blue.svg";
import dogLogo from "../assets/dog.blue.svg";

type MessagesProps = {
    shelter:Shelter
    user: User
}

export default function YourMessagesPage(props: MessagesProps) {

    const [username, setUsername] = useState<string>(props.user.userName + props.shelter.userName)
    const [messageList, setMessageList] = useState<Message[]>([])
    const [isChecked, setIsChecked] = useState<boolean[]>([true,false])


    function fetchMessages() {
        axios.get("/api/messages/" + username)
            .then(response => setMessageList(response.data))
            .catch(e => console.log(e.message))
    }

    function switchDisplayedMessages(mode:number) {
        if (mode === 0) {
            setIsChecked([true,false])
        } else {
            setIsChecked([false,true])
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])


    return <>
        <div>
            <div>
                <input
                    type={"checkbox"}
                    id={"received"}
                    checked={isChecked[0]}
                    onChange={() => switchDisplayedMessages(0)}
                />
                <label htmlFor={"received"}>Empfangen</label>

                <input
                    type={"checkbox"}
                    id={"sent"}
                    checked={isChecked[1]}
                    onChange={() => switchDisplayedMessages(1)}
                />
                <label htmlFor={"sent"}>Gesendet</label>
            </div>
            <div>
                <button>Refresh</button>
            </div>
        </div>
        <div>
            Nachrichten für {username}:
            <div>
                {isChecked[0] ? messageList
                        .filter((message) => message.recipient.includes(username))
                        .map((message:Message) =>(
                    <MessageCard id={message.id} addressee={message.addressee} recipient={message.recipient} header={message.header} message={message.message} timestamp={message.timestamp} key={message.id}/>
                ))
                : messageList
                        .filter((message) => message.addressee.includes(username))
                        .map((message:Message) =>(
                            <MessageCard id={message.id} addressee={message.addressee} recipient={message.recipient} header={message.header} message={message.message} timestamp={message.timestamp} key={message.id}/>
                        ))}
            </div>
        </div>
    </>
}