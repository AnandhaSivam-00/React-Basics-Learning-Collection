import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../../../../config/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';

const initialState = {
    loading: false,
    userData: [],
    settingsData: [],
    gameHistory: [],
    error: false
}

export const fetchUserPersonalData = createAsyncThunk(
    'user-data/fetchUserPersonalData',
    async (userId, { rejectWithValue }) => {
        try {
            const userRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userId);
            const userSnapshot = await getDoc(userRef);

            if(userSnapshot.exists()) {
                const data = userSnapshot.data();

                return {
                    ...data,
                    created_at: data.created_at.toDate().toLocaleDateString(),
                    updated_at: data.updated_at.toDate().toLocaleDateString(),
                }
            } 
            else {
                console.log('No such document!');
                return rejectWithValue('No user data found');
            }
        } 
        catch(error) {
            return rejectWithValue('Error fetching user data: ' + error.message);
        }
    }
)

export const fetchUserGameHistory = createAsyncThunk(
    'user-data/fetchUserGameHistory',
    async (userId, { rejectWithValue }) => {
        try {
            const historyRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userId, 'Data', 'game-history');
            const historySnapshot = await getDoc(historyRef);

            if(historySnapshot.exists()) {
                return historySnapshot.data();
            }
            else {
                console.log('No such document!');
                return rejectWithValue('No game history data found');
            }
        }
        catch(error) {
            return rejectWithValue('Error fetching user\'s game history..' + error.message);
        }
    }
)

export const fetchUserSettingData = createAsyncThunk(
    'user-data/fetchUserSettingData',
    async (userId, { rejectWithValue }) => {
        try {
            const settingsRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userId, 'Data', 'settings-data');
            const settingsSnapshot = await getDoc(settingsRef);

            if(settingsSnapshot.exists()) {
                const settings = settingsSnapshot.data();

                return {
                    ...settings,
                    updated_at: settings.updated_at.toDate().toLocaleDateString(),
                }
            }
            else {
                console.log('No such document!');
                return rejectWithValue('No setting data found');
            }
        }
        catch(error) {
            return rejectWithValue('Error fetching user\'s settings data..' + error.message);
        }
    }
)

export const updateUserPersonalData = createAsyncThunk(
    'user-data/updateUserPersonalData',
    async (userData, { rejectWithValue }) => {
        try {
            const userRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userData.user_id);
            await updateDoc(userRef, {
                ...userData,
                updated_at: new Date()
            });
            console.log('User data updated successfully:', userData);
            return userData;
        }
        catch(error) {
            console.error('Error updating user data:', error);
            return rejectWithValue('Error updating user data: ' + error.message);
        }
    }
)

export const updateUserSettingsData = createAsyncThunk(
    'user-data/updateUserSettingsData',
    async ({ settingsData, userId }, { rejectWithValue }) => {
        try {
            const settingsRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userId, 'Data', 'settings-data');
            await updateDoc(settingsRef, {
                ...settingsData,
                updated_at: new Date()
            });
            console.log(settingsData);
            return settingsData;
        }
        catch(error) {
            return rejectWithValue('Error updating user settings data: ' + error.message);
        }
    }
)

const userSlice = createSlice({
    name: 'user-data',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPersonalData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserPersonalData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(fetchUserPersonalData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserGameHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserGameHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.gameHistory = action.payload;
            })
            .addCase(fetchUserGameHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserSettingData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserSettingData.fulfilled, (state, action) => {
                state.loading = false;
                state.settingsData = action.payload;
            })
            .addCase(fetchUserSettingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserPersonalData.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserPersonalData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(updateUserPersonalData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserSettingsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserSettingsData.fulfilled, (state, action) => {
                state.loading = false;
                state.settingsData = action.payload;
            })
            .addCase(updateUserSettingsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default userSlice.reducer;