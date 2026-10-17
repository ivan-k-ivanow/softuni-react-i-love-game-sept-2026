import { authRequest } from "../utils/request";

export const register = async ({email, password}) => {
    // Implement the registration logic with Supabase or any other auth service
    return authRequest("/signup", "POST", { email, password });
};

