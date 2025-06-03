import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import userLogReducer from '../features/userLogSlice';
import leaderboardReducer from '../features/leaderboardSlice';
// import { errorClearingMiddleware } from '../middleware/errorClearingMiddleware';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        userlog: userLogReducer,
        leaderboard: leaderboardReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore paths where Firebase Timestamps exist
        ignoredActionPaths: ['payload.docs', 'payload.lastVisibleDoc', 'meta.arg'],
        ignoredPaths: ['leaderboard.allUserLogs', 'leaderboard.lastVisibleDoc'],
      },
    }),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorClearingMiddleware),
})

export default store;