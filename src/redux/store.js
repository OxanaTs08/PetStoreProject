import { configureStore } from '@reduxjs/toolkit'
import {productsSlice} from '../productsSlice' 

const store = configureStore({
  reducer: {
    auth: productsSlice
  }
});

export default store