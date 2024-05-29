import './NewMessage.css'
import {Message} from "../model/Message.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";


type NewMessageProps = {
    setPopup: (Popup: boolean) => void
    username: string
    recipient: string
    header: string
}

export function NewMessage(props: NewMessageProps) {

    const [newMessage, setNewMessage] = useState<Message>({
        id: "",
        addressee: props.username,
        recipient: props.recipient,
        header: props.header,
        message: "",
        timestamp: "",
    })

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const key = event.target.name
        setNewMessage({...newMessage, [key]: event.target.value})
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        console.log("Hallo")
        console.log(newMessage)
        event.preventDefault()
        axios.post("/api/messages", newMessage)
            .then(() => {setNewMessage({
                id: "",
                addressee: props.username,
                recipient: "",
                header: "",
                message: "",
                timestamp: "",
            }
            )})
            .then(() => props.setPopup(false))
            .catch(e => {console.log(e.message)})
    }



    return <div className={"new_message_card"}>
        <form onSubmit={handleSubmit} className={"new_message_form"}>
            <input onChange={handleInputChange} name={"recipient"} placeholder={"Empfänger"} value={newMessage.recipient}/>
            <input onChange={handleInputChange} placeholder={"Betreff"} name={"header"} value={newMessage.header}/>
            <textarea onChange={handleInputChange} placeholder={"Max. 440 Zeichen"} name={"message"} rows={7} cols={55} maxLength={440} value={newMessage.message}></textarea>
            <div id={"button_container"}>
                <button type={"submit"}>Abschicken</button>
            </div>
        </form>
        <button className={"close_popup"} onClick={() => props.setPopup(false)}>❌</button>
    </div>
}