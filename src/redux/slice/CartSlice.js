import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'http://localhost:3333/order/send';

export const sendOrder = createAsyncThunk(
    'cart/sendOrder',
    async (cartItems, clientData, thunkApi) => {
      try {
        const response = await axios.post(API_URL, {...clientData, products: cartItems.map((item) => 
          ({ id: item.id, quantity: item.quantity })) });
        return response.data;
      } catch (error) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue({ message });
      }
    }
  );

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        cartCount: 0,
    },
    reducers: {
      addToCart: (state, action) => {
        const item = action.payload;
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            state.cart.push({ ...item, quantity: 1 });
          }
          state.cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);
      },
      removeFromCart: (state, action) => {
        const itemId = action.payload;
        const itemToRemove = state.cart.find((cartItem) => cartItem.id === itemId);
        state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
        if (itemToRemove) {
          state.cartCount -= itemToRemove.quantity;
        }
        state.cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);
      },
      clearCart: (state) => {
        state.cart = [];
        state.cartCount = 0;
      },
      updateQuantity: (state, action) => {
        const item = state.cart.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
        state.cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendOrder.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(sendOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        })
        .addCase(sendOrder.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload.message;
        });
    }
  });

  export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
  
  export default cartSlice.reducer;