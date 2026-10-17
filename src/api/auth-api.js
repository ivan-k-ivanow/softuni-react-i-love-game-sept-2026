import { authRequest } from "../utils/request";

export const register = async ({email, password},) => {
    // Implement the registration logic with Supabase or any other auth service
    return authRequest("/signup", "POST", { email, password });
};
export const login = async ({email, password}) => {
    // Implement the login logic with Supabase or any other auth service
    return authRequest("/token?grant_type=password", "POST", { email, password });
};

export const logout = async (accessToken) => {
    // Implement the logout logic with Supabase or any other auth service
    return authRequest("/logout", "POST", null, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};