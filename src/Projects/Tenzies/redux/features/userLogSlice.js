import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { db } from '../../../../config/firebaseConfig';
import { 
    collection, 
    addDoc, 
    doc, 
    getDocs,
    getDoc,
    query,
    where,
    setDoc, 
    serverTimestamp, 
    getCount,
    orderBy,
    limit,
    updateDoc,
} from "firebase/firestore/lite";

import { formatFirebaseTimestamp, formatCurrentDateTime } from '../../utils/DateTimeFormatting';

const initialState = {
    loading: false,
    userlogs: [],
    currentGameLog: [],
    gameHistory: [],
    error: false
};

export const fetchCurrentUserLog = createAsyncThunk(
    'user-log/fetchCurrentUserLog',
    async (userId, { rejectWithValue }) => {
        if(!userId) {
            return rejectWithValue('User ID is required to fetch logs');
        }

        try {
            const logRef = collection(db, 'Tenzies', 'tenzies-database', 'User Logs');
            const userLogsQuery = query(
                logRef, 
                where('user_id', '==', userId),
                orderBy('date_time', 'desc'),
            );
            const querySnapshot = await getDocs(userLogsQuery);
            const userLogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return userLogs;
        }
        catch(error) {
            console.error('Error fetching user logs:', error);
            return rejectWithValue('Error fetching user logs: ' + error.message);
        }
    }
)

export const addUserLog = createAsyncThunk(
    'user-log/addUserLog',
    async (logData, { rejectWithValue }) => {
        try {
            const logRef = collection(db, 'Tenzies', 'tenzies-database', 'User Logs');

            const docRef = await addDoc(logRef, {
                ...logData,
                date_time: serverTimestamp()
            });

            return {
                id: docRef.id,
                date_time: formatCurrentDateTime(),
                ...logData
            }
        }
        catch(error) {
            console.error('Error adding user log:', error);
            return rejectWithValue('Error adding user log: ' + error.message);
        }
    }
)

export const updateUserLogStatistics = createAsyncThunk(
    'user-log/updateUserLogStatistics',
    async ({userId, gameHistory, currentGameLog}, { rejectWithValue }) => {
        // dispatch(fetchCurrentUserLog(userId));
        
        try {
            const logRef = collection(db, 'Tenzies', 'tenzies-database', 'User Logs');
            const historyRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userId, 'Data', 'game-history');
            const currentLogDateTime = formatCurrentDateTime();

            console.log('Fetching user log statistics for user:', userId);

            const userLogsQuery = query(logRef, where('user_id', '==', userId));
            const totalAttemptsQuerySnapshot = await getCount(userLogsQuery);
            const totalAttempts = totalAttemptsQuerySnapshot.data().count;
            console.log('Total attempts:', totalAttempts);
            
            if(totalAttempts === 1) {
                await updateDoc(historyRef, {
                    ...gameHistory,
                    total_attempts: totalAttempts,
                    highest_clicks: currentGameLog.total_roll_clicks,
                    lowest_clicks: currentGameLog.total_roll_clicks,
                    fastest_finish: currentGameLog.time_taken_formatted,
                    fastest_time_taken: currentGameLog.time_taken,
                    latest_attempt_at: serverTimestamp(),
                })

                return {
                    ...gameHistory,
                    total_attempts: totalAttempts,
                    highest_clicks: currentGameLog.total_roll_clicks,
                    lowest_clicks: currentGameLog.total_roll_clicks,
                    fastest_finish: currentGameLog.time_taken_formatted,
                    fastest_time_taken: currentGameLog.time_taken,
                    latest_attempt_at: currentLogDateTime,
                };
            }
            else {
                const highestClicksQuery = query(
                    logRef, 
                    where('user_id', '==', userId), 
                    where('total_roll_clicks', '>=', gameHistory.highest_clicks),
                    orderBy('total_roll_clicks', 'desc'),
                    limit(1)
                );
                const highestClicksQuerySnapshot = await getDocs(highestClicksQuery);
                const highestClicks = highestClicksQuerySnapshot.empty 
                    ? gameHistory.highest_clicks 
                    : highestClicksQuerySnapshot.docs[0].data().total_roll_clicks;
                console.log('Highest clicks:', highestClicks);
    
                const lowestClicksQuery = query(
                    logRef, 
                    where('user_id', '==', userId), 
                    where('total_roll_clicks', '<=', gameHistory.lowest_clicks),
                    orderBy('total_roll_clicks', 'asc'),
                    limit(1)
                );
                const lowestClicksQuerySnapshot = await getDocs(lowestClicksQuery);
                const lowestClicks = lowestClicksQuerySnapshot.empty
                    ? gameHistory.lowest_clicks
                    : lowestClicksQuerySnapshot.docs[0].data().total_roll_clicks;
                console.log('Lowest clicks:', lowestClicks);
    
                const fastestFinishQuery = query(
                    logRef, 
                    where('user_id', '==', userId), 
                    where('time_taken', '<=', gameHistory.fastest_time_taken),
                    orderBy('time_taken', 'asc'),
                    limit(1)
                );
                const fastestFinishQuerySnapshot = await getDocs(fastestFinishQuery);
                const fastestFinish = fastestFinishQuerySnapshot.empty
                    ? gameHistory.fastest_time_taken
                    : fastestFinishQuerySnapshot.docs[0].data().time_taken;
                const fastestFinishFormatted = fastestFinishQuerySnapshot.empty
                    ? gameHistory.fastest_finish
                    : fastestFinishQuerySnapshot.docs[0].data().time_taken_formatted;
                console.log('Fastest finish time:', fastestFinish, 'Formatted:', fastestFinishFormatted);

                await updateDoc(historyRef, {
                    ...gameHistory,
                    total_attempts: totalAttempts,
                    highest_clicks: highestClicks,
                    lowest_clicks: lowestClicks,
                    fastest_finish: fastestFinishFormatted,
                    fastest_time_taken: fastestFinish,
                    latest_attempt_at: serverTimestamp(),
                })
    
                return {
                    ...gameHistory,
                    total_attempts: totalAttempts,
                    highest_clicks: highestClicks,
                    lowest_clicks: lowestClicks,
                    fastest_finish: fastestFinishFormatted,
                    fastest_time_taken: fastestFinish,
                    latest_attempt_at: currentLogDateTime,
                }
            }
        }
        catch(error) {
            console.error('Error fetching user log statistics:', error);
            return rejectWithValue('Error fetching user log statistics:\n' + error.message);
        }
    }
)

export const fetchUserGameHistory = createAsyncThunk(
    'user-log/fetchUserGameHistory',
    async (userId, { rejectWithValue }) => {
        try {
            const historyRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userId, 'Data', 'game-history');
            const historySnapshot = await getDoc(historyRef);

            if(historySnapshot.exists()) {
                const data = historySnapshot.data();
                return {
                    ...data,
                    latest_attempt_at: typeof data.latest_attempt_at === 'string' ? data.latest_attempt_at :
                        formatFirebaseTimestamp(data.latest_attempt_at)
                };
            }
            else {
                throw new Error('No game history document found');
            }
        }
        catch(error) {
            console.error('Error fetching user\'s game history:', error);
            return rejectWithValue('Error fetching user\'s game history..' + error.message);
        }
    }
)

const userLogSlice = createSlice({
    name: "user-log",
    initialState,
    reducers: {
        clearUserLogError: (state) => {
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserLog.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUserLog.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGameLog = action.payload;
            })
            .addCase(addUserLog.rejected, (state, action) => {
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
            .addCase(updateUserLogStatistics.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserLogStatistics.fulfilled, (state, action) => {
                state.loading = false;
                state.gameHistory = action.payload;
            })
            .addCase(updateUserLogStatistics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { clearUserLogError } = userLogSlice.actions;
export default userLogSlice.reducer;