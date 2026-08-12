import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../config/firebaseConfig';
import {
    collection,
    query,
    orderBy,
    limit,
    startAfter,
    getDocs,
    where,
    doc,
    getDoc
} from 'firebase/firestore/lite';

import { formatFirebaseTimestamp } from '../../utils/DateTimeFormatting';


const initialState = {
    loading: false,
    globalLeaderboard: [],
    allUserLogs: {},
    lastVisibleDoc: null,
    hasNextPage: true,
    hasPrevPage: false,
    currentPage: 1,
    ITEMS_PER_PAGE: 3,
    error: false
}

export const fetchGlobalLeaderboard = createAsyncThunk(
    'leaderboard/fetchGlobalLeaderboard',
    async (_, { rejectWithValue }) => {
        try {
            const usersRef = collection(db, 'Tenzies', 'tenzies-database', 'Users');
            const usersSnapshot = await getDocs(usersRef);

            const userPromises = usersSnapshot.docs.map(async (userDoc) => {
                const userData = userDoc.data();
                const historyRef = doc(db, 'Tenzies', 'tenzies-database', 'Users', userDoc.id, 'Data', 'game-history');
                const historySnapshot = await getDoc(historyRef);

                if(historySnapshot.exists()) {
                    const historyData = historySnapshot.data();
                    
                    // Only include users who have actually played (total_attempts > 0)
                    if(historyData.total_attempts > 0 && historyData.fastest_time_taken != null) {
                        return {
                            id: userDoc.id,
                            name: userData.name || userData.user_name || 'Anonymous',
                            ...historyData,
                            latest_attempt_at_formatted: typeof historyData.latest_attempt_at === 'string' 
                                ? historyData.latest_attempt_at 
                                : formatFirebaseTimestamp(historyData.latest_attempt_at)
                        };
                    }
                }
                return null;
            });

            const results = await Promise.all(userPromises);
            
            // Filter out nulls
            let validUsers = results.filter(user => user !== null);

            // Sort by fastest time taken (asc), then by lowest clicks (asc)
            validUsers.sort((a, b) => {
                if(a.fastest_time_taken === b.fastest_time_taken) {
                    return a.lowest_clicks - b.lowest_clicks;
                }
                return a.fastest_time_taken - b.fastest_time_taken;
            });

            // Get top 10
            return validUsers.slice(0, 10);
            
        } 
        catch(error) {
            console.error('Error fetching global leaderboard:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserLogChunks = createAsyncThunk(
    'leaderboard/fetchUserLogChunks',
    async ({
        userId,
        newPage,
        direction,
    }, { rejectWithValue, getState }) => {

        const currentState = getState().leaderboard;

        try {
            const userLogRef = collection(db, 'Tenzies', 'tenzies-database', 'User Logs');
            const baseOrder = orderBy('date_time', 'desc');
            let fetchQuery;

            if (direction === 'initial') {
                fetchQuery = query(
                    userLogRef,
                    where('user_id', '==', userId),
                    baseOrder,
                    limit(currentState.ITEMS_PER_PAGE + 1)
                );
            }
            else if (direction === 'next') {
                fetchQuery = query(
                    userLogRef,
                    where('user_id', '==', userId),
                    baseOrder,
                    startAfter(currentState.lastVisibleDoc),
                    limit(currentState.ITEMS_PER_PAGE + 1)
                );
            }
            else {
                throw new Error('Invalid direction for pagination');
            }

            const docsSnapshot = await getDocs(fetchQuery);

            if (docsSnapshot.empty) {
                return {
                    docs: [],
                    lastVisibleDoc: null,
                    hasNext: false,
                    newPage: newPage
                }
            }

            const lastDoc = docsSnapshot.docs[docsSnapshot.docs.length - 1];
            const hasMore = docsSnapshot.docs.length > currentState.ITEMS_PER_PAGE;

            return {
                docs: docsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        key: doc.id,
                        ...doc.data()
                    })),
                lastVisibleDoc: hasMore ? lastDoc : null,
                hasNext: hasMore,
                newPage: newPage, 
            }
        }
        catch (error) {
            console.error('Error fetching user logs:', error);
            return rejectWithValue(error.message);
        }
    }
)

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        clearLeaderboardError: (state) => {
            state.error = false;
        },
        setCurrentPage: (state, action) => {
            state.hasPrevPage = action.payload > 1;
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.ITEMS_PER_PAGE = action.payload;
            state.currentPage = 1;
            state.lastVisibleDoc = null;
        },
        enableNextPage: (state, action) => {
            state.hasNextPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalLeaderboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGlobalLeaderboard.fulfilled, (state, action) => {
                state.loading = false;
                state.globalLeaderboard = action.payload;
            })
            .addCase(fetchGlobalLeaderboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserLogChunks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserLogChunks.fulfilled, (state, action) => {
                state.loading = false;

                const { docs, lastVisibleDoc, hasNext, newPage } = action.payload;

                if (docs && docs.length > 0) {
                    state.allUserLogs = {
                        ...state.allUserLogs,
                        [newPage]: docs
                    };
                    state.lastVisibleDoc = lastVisibleDoc;
                    state.hasNextPage = hasNext;
                    state.hasPrevPage = newPage > 1;
                }
                else {
                    state.hasNextPage = false;
                    state.hasPrevPage = newPage > 1;
                    state.allUserLogs = {
                        ...state.allUserLogs,
                        [newPage]: []
                    };
                }
            })
            .addCase(fetchUserLogChunks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const {
    clearLeaderboardError,
    setCurrentPage,
    setPageSize,
    enableNextPage
} = leaderboardSlice.actions;
export default leaderboardSlice.reducer;