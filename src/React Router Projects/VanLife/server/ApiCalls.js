export const getVans = async () => {
    const response = await fetch('/api/vans');

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