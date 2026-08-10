export const authErrorMessageGenerator = (errorCode) => {
    switch(errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email format.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/too-many-requests':
            return 'Too many failed login attempts. Try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Check your connection.';
        case 'auth/invalid-credential':
            return 'Invalid credentials provided.';
        case 'auth/account-exists-with-different-credential':
            return 'Account already linked with different provider';
        default:
            return 'Login failed. Please try again.';
    }
}