import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import {initializedState} from "react-slick/lib/utils/innerSliderUtils.js";

const API_URL = 'http://localhost:3333/products';

export const allProducts = createAsyncThunk(
    'products/all',
    async (_, thunkApi) => {
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

export const productById = createAsyncThunk(
    'products/id',
    async (productId, thunkApi) => {
        try {
            const response = await axios.get(`${API_URL}/${productId}`);
            // console.log(response.data);
            console.log(productId);
            console.log(`${API_URL}/${productId}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch product data';
            return thunkApi.rejectWithValue({ message });
        }
    }
);

const initialState = {
    products: null,
    productData: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        resetState: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(allProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            .addCase(productById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(productById.fulfilled, (state, action) => {
                if (action.payload.status === 'ERR') {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload.message;
                } else {
                state.isLoading = false;
                state.isSuccess = true;
                state.productData = action.payload;
                }
            })
            .addCase(productById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

export const { resetState } = productsSlice.actions;
export default productsSlice.reducer;
