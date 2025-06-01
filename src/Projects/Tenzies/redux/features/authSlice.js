import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../../../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';

import { formatFirebaseTimestamp } from '../../utils/DateTimeFormatting';

const initialState = {
    loading: false,
    isAuthenticated: false,
    credential: null,
    error: false
}

export const loginUserAction = createAsyncThunk(
    'user-auth/loginUserAction',
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                loginData.email || loginData.username,
                loginData.password
            );

            return {
                uid: response.user.uid,
                email: response.user.email,
                displayName: response.user.displayName,
                accessToken: response.user.accessToken
            };
        }
        catch(error) {
            console.error('Error logging in user:', error);
            const errorCode = error.code;
            let errorMessage;

            switch (errorCode) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email format.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed login attempts. Try again later.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Check your connection.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid credentials provided.';
                    break;
                default:
                    errorMessage = 'Login failed. Please try again.';
            }

            return rejectWithValue(errorMessage);
        }
    }
)

export const registerUserAction = createAsyncThunk(
    'user-auth/registerUserAction',
    async (userData, { rejectWithValue }) => {
        const userSettingsData ={
            trail_mode: false,
            dark_mode: false,
            show_on_lb: true,
            send_emails: false
        }
        const GHSData = {
            total_attempts: 0,
            lb_rank: 'N/A',
            highest_clicks: 0,
            lowest_clicks: 0,
            fastest_finish: '00:00:00',
            latest_attempt_at: 'N/A'
        }

        try {
            // Creating the authentication entry on firebase authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );

            // Set users personal data
            const userRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userCredential.user.uid);
            await setDoc(userRef, {
                user_id: userCredential.user.uid,
                name: userData.name,
                user_name: '',
                phone_number: Number(userData.phone_number) || 0,
                email: userData.email,
                gender: userData.gender,
                about_me: userData.about_me || '',
                isAgreeAgreements: userData.agreement_status,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            });

            // Set user's settings data
            const userSettingsRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userCredential.user.uid, 'Data', 'settings-data');
            await setDoc(userSettingsRef, {
                ...userSettingsData
            });

            // Set user's game history
            const userGHSRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userCredential.user.uid, 'Data', 'game-history');
            await setDoc(userGHSRef, {
                ...GHSData
            });

            return userCredential.user.accessToken;
        }
        catch (error) {
            console.error('Error registering user:', error);
            const errorCode = error.code;
            let errorMessage;

            switch (errorCode) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email format.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password accounts are not enabled.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak. Use at least 6 characters.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Check your connection.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many requests. Try again later.';
                    break;
                default:
                    errorMessage = 'Registration failed. Please try again.';
            }

            return rejectWithValue(errorMessage);
        }
    }
)

const authSlice = createSlice({
    name: 'user-auth',
    initialState,
    reducers: {
        logoutUserAction: (state) => {
            signOut(auth)
                .then(() => {
                    console.log('User signed out successfully!');
                    state.isAuthenticated = false;
                    state.credential = {
                        logout: true
                    }
                    state.loading = false;
                    state.error = false;
                })
                .catch((error) => {
                    console.error('Error signing out user:', error.message);
                    state.error = error.message;
                });

        },
        clearError: (state) => {
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.credential = action.payload;
            })
            .addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.credential = action.payload;
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.loging = false;
                state.error = action.payload;
            })
    }
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;