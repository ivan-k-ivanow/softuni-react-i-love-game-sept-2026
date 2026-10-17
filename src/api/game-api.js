import request from "../utils/request";

export const getAll = (accessToken) => {
    return request("/games?order=created_at.desc", "GET", null, {
        headers: {
            ...getAuthHeaders(accessToken)
        }
    });
}

export const create = (data, accessToken) => {
    return request("/games", "POST", data, {
        headers: {
            ...getAuthHeaders(accessToken)
        }
    });
}


function getAuthHeaders(accessToken) {
    return {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    };
}