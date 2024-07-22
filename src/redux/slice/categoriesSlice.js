import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const API_URL = 'http://localhost:3333/categories';

export const allCategories = createAsyncThunk(
    'categories/all',
    async (
        thunkApi
    ) => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            const message = error.response.data.message;
            return thunkApi.rejectWithValue({ message });
        }
    }
);

export const categoryById = createAsyncThunk(
    'categories/id',
    async (
        categoryId,
        thunkApi
    ) => {
        try {
            const response = await axios.get(`${API_URL}/${categoryId}`);
            console.log(response.data);
            console.log(categoryId);
            console.log(`${API_URL}/${categoryId}`)
            return response.data;
        } catch (error) {
            const message = error.response.data.message;
            return thunkApi.rejectWithValue({ message });
        }
    }
);

const categoriesSlice = createSlice({
    name: 'category',
    initialState: {
        categories: null,
        categoryData: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = action.payload;
            })
            .addCase(allCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(categoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(categoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categoryData = action.payload;
            })
            .addCase(categoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export default categoriesSlice.reducer;