import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from './redux/thunk';


export const productsSlice = createSlice({
    name: 'products',
    initialState: {
     products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.map((product, index) => ({ ...product, index }));
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.status = action.error.message;
            })
            
    },
});

