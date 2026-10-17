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
import { authApi } from "./api"
import { useNavigate } from "react-router"; 
import AuthContext from "./contexts/auth-context"

function App() {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();

    const register = async (userData) => {
        // authenticate with supabase auth
        try {
            const result = await authApi.register(userData);
            alert("Registration successful!");
            setAuth(result);
            // Redirect to home page
            navigate("/");

        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    };

    const login = async (userData) => {
        try {
            const result = await authApi.login(userData);
            alert("Login successful!");
            setAuth(result);
            navigate("/");
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };


    const logoutHandler = () => {
        setAuth(null);
    };

    const contextValue = { 
        accessToken: auth?.access_token,
        user: auth?.user,
        isAuthenticated: !!auth,
        login,
        register,
    };

    return (
        <>
        <AuthContext.Provider value={contextValue}>
            <Header isAuthenticated={!!auth} />


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/:gameId" element={<GameDetails user={auth?.user} />} />
                <Route path="/games/:gameId/edit" element={<GameEdit />} />
                <Route path="/register" element={<Register onRegister={register} />} />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/logout" element={<Logout onLogout={logoutHandler} />} />
            </Routes>

            <Footer />
        </AuthContext.Provider>
        </>
    )
}

export default App
