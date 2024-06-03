import './App.css'
import './components/LogoLogin.css'
import {NavBar} from "./components/NavBar.tsx";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import FindPetPage from "./pages/findPetPage.tsx";
import FindPetDetailPage from "./pages/findPetDetailPage.tsx";
import RegistrationPage from "./pages/registrationPage.tsx";
import LoginPage from "./pages/loginPage.tsx";
import PlacePetPage from "./pages/placePetPage.tsx";
import {useState} from "react";
import websiteLogo from "./assets/logo_mw_small.jpg";
import loginLogo from "./assets/userLogo.png";
import axios from "axios";
import {User} from "./model/User.ts";
import {Shelter} from "./model/Shelter.ts";
import YourMessagesPage from "./pages/yourMessagesPage.tsx";

export default App

function App() {

    const [loggedInUser, setLoggedInUser] = useState<User>({
        id: "",
        firstName: "",
        lastName: "",
        mail: "",
        userName: "",
        password: "",
        role: ""
    })
    const [loggedInShelter, setLoggedInShelter] = useState<Shelter>({
        id: "",
        name: "",
        street: "",
        postalCode: "",
        city: "",
        mail: "",
        userName: "",
        password: "",
        role: ""
    })

    const navigate = useNavigate()

    function toProfile() {
        if (loggedInUser.userName === "" && loggedInShelter.userName === "") {
            navigate("/login")
        }
    }

    function logout() {
        axios.post("/api/user/logout")
            .then(() => setLoggedInUser({
                id: "",
                firstName: "",
                lastName: "",
                mail: "",
                userName: "",
                password: "",
                role: ""
            }))
            .then(() => setLoggedInShelter({
                id: "",
                name: "",
                street: "",
                postalCode: "",
                city: "",
                mail: "",
                userName: "",
                password: "",
                role: ""
            }))
            .then(() => navigate("/login"))
    }


  return (
    <>
        <header>
            <div className={"logo_login_container"}>
                <div className={"logo_container"} onClick={() => navigate("/")}>
                    <img id="website_logo" src={websiteLogo}/>
                    <p id={"headline"}>miwau</p>
                </div>

                <div className={"login_container"}>

                    <div>
                        {loggedInUser.userName === "" && loggedInShelter.userName === "" ?
                            <Link id={"registration_link"} to={"/registration"}>Registrieren</Link>
                            :
                            <div>{loggedInUser.userName}{loggedInShelter.userName}</div>
                    }
                </div>

                    <div className={"dropdown"}>
                        <button id={"login_div"} className={"dropbtn"} onClick={toProfile}>
                            <img id={"login_logo"} src={loginLogo}/>
                        </button>
                        {(loggedInUser.userName !== "" || loggedInShelter.userName !== "") &&
                            <div className={"dropdown-content"}>
                                <a>Profil</a>
                                <Link to={"/messages"}>Nachrichten</Link>
                                <a onClick={logout}>Logout</a>
                            </div>
                        }
                    </div>

                </div>
            </div>
            <NavBar/>
        </header>
        <main>
            <Routes>
                <Route path={"/"} element={<FindPetPage/>}/>
                <Route path={"/find/:id"} element={<FindPetDetailPage user={loggedInUser} shelter={loggedInShelter}/>}/>
                <Route path={"/registration"} element={<RegistrationPage/>}/>
                <Route path={"/login"} element={<LoginPage setUser={setLoggedInUser} setShelter={setLoggedInShelter}/>}/>
                <Route path={"/place"} element={<PlacePetPage shelter={loggedInShelter}/>}/>
                <Route path={"/messages"} element={<YourMessagesPage user={loggedInUser} shelter={loggedInShelter}/>}/>
            </Routes>
        </main>
        <footer>
            Footer
        </footer>

    </>
  )
}

