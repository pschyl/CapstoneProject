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

export default App

function App() {

    const[user, setUser] = useState<string>("anonymousUser")
    const navigate = useNavigate()

    function toProfile() {
        if (user === "anonymousUser") {
            navigate("/login")
        }
    }

    function logout() {
        axios.post("/api/user/logout")
            .then(() => setUser("anonymousUser"))
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
                        {user === "anonymousUser" ?
                            <Link id={"registration_link"} to={"/registration"}>Registrieren</Link>
                            :
                            <div>{user}</div>
                        }
                    </div>

                    <div className={"dropdown"}>
                        <button id={"login_div"} className={"dropbtn"} onClick={toProfile}>
                            <img id={"login_logo"} src={loginLogo}/>
                        </button>
                        {user !== "anonymousUser" &&
                            <div className={"dropdown-content"}>
                                <a>Profil</a>
                                <a>Nachrichten</a>
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
                <Route path={"/find/:id"} element={<FindPetDetailPage/>}/>
                <Route path={"/registration"} element={<RegistrationPage/>}/>
                <Route path={"/login"} element={<LoginPage setUser={setUser}/>}/>
                <Route path={"/place"} element={<PlacePetPage/>}/>
            </Routes>
        </main>
        <footer>
            Footer
        </footer>

    </>
  )
}

