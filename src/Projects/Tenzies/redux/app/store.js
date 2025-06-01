import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import userLogReducer from '../features/userLogSlice';
// import { errorClearingMiddleware } from '../middleware/errorClearingMiddleware';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        userlog: userLogReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorClearingMiddleware),
})

export default store;