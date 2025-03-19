export const getVans = async (id) => {
    const url = id ? `/api/vans/${id}` : '/api/vans';
    const response = await fetch(url);

    if(!response.ok) {
        throw {
            message: 'Failed to load vans',
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json();
    return data.vans;
}

export const getHostVans = async (id) => {
    const url = id ? `/api/host/vans/${id}` : '/api/host/vans';
    const response = await fetch(url);

    if(!response.ok) {
        throw {
            message: 'Failed to load host vans',
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json();
    return data.vans;
}

export const loginAuth = async (credentials) => {
    const response = await fetch('/api/login',
        { method: "post", body: JSON.stringify(credentials) }
    )

    const data = await response.json();

    if(!response.ok) {
        throw {
            message: data.message,
            status: response.status,
            statusText: response.statusText
        }
    }
    return data;
}