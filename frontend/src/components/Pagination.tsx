import circle from "../assets/circle.png"
import dot from "../assets/dot.png"
import "../App.css"

type PaginationProps = {
    activePage: number;
    thisPage: number;
}


export function Pagination(props: PaginationProps) {

    function isActive():string {
        if (props.activePage === props.thisPage) {
            return dot
        } else {
            return circle
        }
    }


    return <img className={"pageIcon"} src={isActive()} alt={"marker for active Page"}/>
}