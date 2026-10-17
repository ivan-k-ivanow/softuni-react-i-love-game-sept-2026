import Footer from "./components/footer/Footer"
import Header from "./components/Header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import GameDetails from "./components/game-details/GameDetails"
import GameCreate from "./components/game-create/GameCreate"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import { Route, Routes } from "react-router"
import Logout from "./components/logout/Logout"
import { useState } from "react";
import GameEdit from "./components/game-edit/GameEdit"
import { register } from "./api/auth-api"

function App() {
    const [user, setUser] = useState(null);

    const userAuthHandler = async (userData) => {
        // authenticate with supabase auth
        try {
            const result = await register(userData);
            console.log("Registration successful:", result);
        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    };

    const logoutHandler = () => {
        setUser(null);
    };


    return (
        <>
            <Header isAuthenticated={!!user} />


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId" element={<GameDetails user={user} />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/register" element={<Register onRegister={userAuthHandler} />} />
                <Route path="/login" element={<Login onLogin={userAuthHandler} />} />
                <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
