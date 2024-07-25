import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3333/sale/send';

export const saleRequestSend = createAsyncThunk(
  'clientData/sendRequest',
  async (clientData, thunkApi) => {
    try {
      const response = await axios.post(API_URL, clientData);
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkApi.rejectWithValue({ message });
    }
  },
);

const requestSlice = createSlice({
  name: 'saleRequest',
  initialState: {
    clientData: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saleRequestSend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saleRequestSend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(saleRequestSend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export default requestSlice.reducer;
