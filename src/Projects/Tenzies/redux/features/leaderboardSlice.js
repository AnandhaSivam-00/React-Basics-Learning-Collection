import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../../config/firebaseConfig';
import {
    collection,
    query,
    orderBy,
    limit,
    startAfter,
    getDocs,
    where
} from 'firebase/firestore/lite';


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