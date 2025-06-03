import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../../../../config/firebaseConfig';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore/lite';

import { formatFirebaseTimestamp, formatCurrentDateTime } from '../../utils/DateTimeFormatting';

const initialState = {
    loading: false,
    userData: [],
    settingsData: [],
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
                    created_at: formatFirebaseTimestamp(data.created_at),
                    updated_at: formatFirebaseTimestamp(data.updated_at),
                }
            } 
            else {
                throw new Error('No personal data document found');
            }
        } 
        catch(error) {
            console.error('Error fetching user data:', error);
            return rejectWithValue('Error fetching user data: ' + error.message);
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
                    updated_at: formatFirebaseTimestamp(settings.updated_at),
                }
            }
            else {
                throw new Error('No setting data document found');
            }
        }
        catch(error) {
            console.error('Error fetching user\'s settings data:', error);
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
                updated_at: serverTimestamp()
            });
            console.log('User data updated successfully:', userData);

            return {
                ...userData,
                updated_at: formatCurrentDateTime(),
            };
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
                updated_at: serverTimestamp()
            });
            console.log(settingsData);
            return settingsData;
        }
        catch(error) {
            console.error('Error updating user settings data:', error);
            return rejectWithValue('Error updating user settings data: ' + error.message);
        }
    }
)

const userSlice = createSlice({
    name: 'user-data',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = false;
        }
    },
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

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;