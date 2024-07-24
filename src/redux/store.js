import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from "./slice/categoriesSlice";
import productsSlice from "./slice/productsSlice";
import cartSlice from "./slice/CartSlice";
import requestReducer from "./slice/saleRequestSlice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    cart: cartSlice,
    request: requestReducer,
   }
});

export default store