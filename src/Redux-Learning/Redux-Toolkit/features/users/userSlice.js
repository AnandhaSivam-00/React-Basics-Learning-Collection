import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: [],
    error: false
}

export const fetchUserData = createAsyncThunk(
    'users/fetchUserData', 
    async () => {
        return axios.get('https://fakestoreapi.com/users')
           .then((response) => response.data)
        // Error handling can be done automatically by the createAsyncThunk
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false,
                state.data = action.payload
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })
    }
})

export default userSlice.reducer;