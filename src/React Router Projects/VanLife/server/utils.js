import { redirect } from 'react-router-dom';

export const requireAuth = async (request) => {
    const pathName = new URL(request.url).pathname;
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if(!isLoggedIn) {
        throw {
            message: "You need to log in first",
            redirectTo: `/login?message=You need to log in first&redirectTo=${pathName}`
        };
    }

    return null;
}