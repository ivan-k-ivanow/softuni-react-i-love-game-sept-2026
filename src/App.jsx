import Footer from "./components/footer/Footer"
import Header from "./components/Header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import GameDetails from "./components/game-details/GameDetails"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import { Route, Routes } from "react-router"
import { useState } from "react";

function App() {
    const [user, setUser] = useState(null);

    const userAuthHandler = (userData) => {
        setUser(userData);
    };

    return (
        <>
            <Header isAuthenticated={!!user} />


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/games/:gameId" element={<GameDetails />} />
                <Route path="games/create" element={<GameCreate />} />
                <Route path="/register" element={<Register onRegister={userAuthHandler} />} />
                <Route path="/login" element={<Login />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
