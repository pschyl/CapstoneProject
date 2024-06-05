import {Navigate, Outlet} from "react-router-dom";
import {User} from "../model/User.ts";
import {Shelter} from "../model/Shelter.ts";

type ProtectedRouteProps = {
    user: User | undefined
    shelter: Shelter | undefined
}
export default function ProtectedRoute(props:ProtectedRouteProps) {

    const user = (props.user?.userName + "" + props.shelter?.userName) !== ""

    return(
        user ? <Outlet/> : <Navigate to={"/login"}/>
    )
}