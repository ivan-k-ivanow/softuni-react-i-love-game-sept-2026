const restUrl = "https://pzeafnhiwehkyocjfrzk.supabase.co/rest/v1";
const storageUrl = "https://pzeafnhiwehkyocjfrzk.supabase.co/storage/v1/object/images";

export async function uploadFile(fileName, file) {
    const options = {
        headers: {
            apiKey: import.meta.env.VITE_API_KEY,
            'Content-Type': file.type || 'application/octet-stream'
        },
    };
    const response = await fetch(`${storageUrl}/${fileName}`, {
        method: "POST",
        body: file,
        ...options
    });

    if (!response.ok) {
        throw new Error(`File upload failed with status ${response.status}`);
    }

    return `${storageUrl}/${fileName}`;
};


export default async function request(path = "/", method = "GET", data = null) {
    const options = {
        headers: {
            apiKey: import.meta.env.VITE_API_KEY,
            Prefer: "return=representation"
        }
    };

    if (method !== "GET") {
        options.method = method;
    }

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${restUrl}${path}`, options);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    if ([204, 201].includes(response.status)) {
        return null;
    }

    return response.json();
}
