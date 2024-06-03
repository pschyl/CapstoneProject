import {Pet} from "../model/Pet.ts";
import './PetCard.css'
import {useNavigate} from "react-router-dom";
import arrowright from "../assets/arrowright.png"
import arrowleft from "../assets/arrowleft.png"
import {useState} from "react";

export function PetCard(props:Readonly<Pet>) {

    const [currentImage, setCurrentImage] = useState<number>(0)

    const navigate = useNavigate()
    function showDetails() {
        navigate("/find/" + props.id)
    }

    function changeImage(type:string) {
        if (type === "previous") {
            setCurrentImage(currentImage - 1)
            if (currentImage < 1) {
                setCurrentImage(props.images.length - 1)
            }
        } else {
            setCurrentImage(currentImage + 1)
            if (currentImage > props.images.length - 2) {
                setCurrentImage(0)
            }
        }
    }

    return <div className={"petCard"}>
        <div className={"image_container"}><img onClick={showDetails} src={props.images[currentImage]}/></div>
        {props.images.length > 1 && <div className={"gallery_overlay"}>
            <div onClick={() => changeImage("previous")}><img src={arrowleft}/></div>
            <div onClick={() => changeImage("next")}><img src={arrowright}/></div>
        </div>}
        <div className={"cardInformation"}>
        <div id={"name"}>{props.name}</div>
            <div id={"shelter_name"}>{props.shelter.name}</div>
        </div>
    </div>

}