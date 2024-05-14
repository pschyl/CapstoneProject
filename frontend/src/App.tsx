import './App.css'
import {LogoLogin} from "./components/LogoLogin.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import FindPetPage from "./pages/findPetPage.tsx";
import FindPetDetailPage from "./pages/findPetDetailPage.tsx";
import RegistrationPage from "./pages/registrationPage.tsx";

export default App

function App() {


  return (
    <>
        <header>
            <LogoLogin />
            <NavBar />
        </header>
        <main>
            <Routes>
                <Route path={"/"} element={<FindPetPage />} />
                <Route path={"/find/:id"} element={<FindPetDetailPage />} />
                <Route path={"/registration"} element={<RegistrationPage />} />
            </Routes>
        </main>
        <footer>
            Footer
        </footer>

    </>
  )
}

