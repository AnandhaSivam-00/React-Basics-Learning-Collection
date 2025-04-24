import { auth } from '../../config/firebaseConfig';
import { redirect } from "@remix-run/router";

export const requireFirebaseAuth = async (request) => {
    const browserPath = new URL(request.url).pathname;


    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();

            if(user) {
                resolve({
                    success: true,
                    message: 'User is authenticated'
                });
            }
            else {
                const loginUrl = `/moody/login?message=You must login or create an account first!&redirectTo=${browserPath}`;
                reject(redirect(loginUrl));
                // The redirect in react-router-dom v6.4+ is done using the redirect function from @remix-run/router
                // Create promise for the onAuthStateChanged function to resolve or reject based on the user state
            }
        })
    })
}