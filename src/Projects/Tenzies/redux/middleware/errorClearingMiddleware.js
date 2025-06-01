import { isRejectedWithValue } from '@reduxjs/toolkit';

// Middleware to automatically clear errors after a specified time
export const errorClearingMiddleware = (store) => (next) => (action) => {
  // Process the action first
  const result = next(action);
  
  // Check if the action is a rejected action from any async thunk
  if (isRejectedWithValue(action)) {
    const { type } = action;
    
    // Extract the slice name from the action type (e.g., 'user-auth/loginUserAction/rejected' -> 'user-auth')
    const sliceName = type.split('/')[0];
    
    // Define clear action based on slice name
    let clearAction;
    
    switch (sliceName) {
      case 'user-auth':
        clearAction = { type: 'user-auth/clearError' };
        break;
      case 'user-data':
        clearAction = { type: 'user-data/clearError' };
        break;
      case 'user-log':
        clearAction = { type: 'user-log/clearError' };
        break;
      default:
        clearAction = null;
    }
    
    // Dispatch clear error action after 5 seconds (or your preferred time)
    if (clearAction) {
      setTimeout(() => {
        store.dispatch(clearAction);
      }, 5000); // 5 seconds
    }
  }
  
  return result;
};