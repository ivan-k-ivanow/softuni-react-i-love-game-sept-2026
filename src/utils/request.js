const url = "https://pzeafnhiwehkyocjfrzk.supabase.co/rest/v1";

export default async function request(path = "/", method = "GET", data = null) {
    const options = {
        headers: {
            apiKey: import.meta.env.VITE_API_KEY,
        }
    };

    if (method !== "GET") {
        options.method = method;
    }

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${url}${path}`, options);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}
