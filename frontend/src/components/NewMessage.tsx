import './NewMessage.css'

type NewMessageProps = {
    setPopup: (Popup: boolean) => void
}

export function NewMessage(props: NewMessageProps) {
    return <div className={"new_message_card"}>
        <form className={"new_message_form"}>
            <input placeholder={"Empfänger"}/>
            <input placeholder={"Betreff"}/>
            <textarea placeholder={"Max. 440 Zeichen"} rows={7} cols={55} maxLength={440}></textarea>
            <button>Abschicken</button>
        </form>
        <button className={"close_popup"} onClick={() => props.setPopup(false)}>❌</button>
    </div>
}