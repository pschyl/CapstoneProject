import './App.css'
import {LogoLogin} from "./components/LogoLogin.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import FindPetPage from "./pages/findPetPage.tsx";

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
            </Routes>
        </main>
        <footer>
            Footer
        </footer>

    </>
  )
}

