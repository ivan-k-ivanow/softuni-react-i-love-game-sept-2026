import { createContext } from "react";

const AuthContext = createContext({
    accessToken: '',
    user: {},
    isAuthenticated: false,
    login() {},
    register() {},
});

export default AuthContext;