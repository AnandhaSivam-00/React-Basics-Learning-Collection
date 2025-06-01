import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../../../config/firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    setPersistence, 
    browserLocalPersistence,
    browserSessionPersistence,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';

import { formatFirebaseTimestamp } from '../../utils/DateTimeFormatting';

const initialState = {
    loading: false,
    isAuthenticated: false,
    credential: null,
    error: false
}

export const requireAuthUser = createAsyncThunk(
    'user-auth/requireAuthUser',
    async (request, { rejectWithValue }) => {
        const browserPath = new URL(request.url).pathname;

        try {
            // Create a Promise and immediately return its result
            const user = await new Promise((resolve, reject) => {
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    unsubscribe();
                    if(user) {
                        resolve(user);
                    } 
                    else {
                        reject(new Error("Not authenticated"));
                    }
                });
            });
            
            // If we get here, authentication succeeded
            return {
                accessToken: user.accessToken,
                uid: user.uid,
            };
        } 
        catch(error) {
            // Here we handle the rejected promise and call rejectWithValue
            return rejectWithValue([
                'Authentication failed. Please login or create an account.',
                `/tenzies-game/login?message=You must login or create an account first!&redirectTo=${browserPath}`
            ]);
        }
    }
)

export const logoutUserAction = createAsyncThunk(
    'user-auth/logoutUserAction',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            console.log('User logged out successfully');
            return null; 
        }
        catch(error) {
            console.error('Error logging out user:', error);
            return rejectWithValue('Logout failed. Please try again.');
        }
    }
)

export const loginUserAction = createAsyncThunk(
    'user-auth/loginUserAction',
    async (loginData, { rejectWithValue }) => {
        try {
            await setPersistence(auth, browserSessionPersistence);

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
        clearAuthError: (state) => {
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
            .addCase(requireAuthUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(requireAuthUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.credential = action.payload;
            })
            .addCase(requireAuthUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.credential = null;
                state.error = action.payload;
            })
            .addCase(logoutUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUserAction.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.credential = {
                    logout: true
                };
                state.error = false;
            })
            .addCase(logoutUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;