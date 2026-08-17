import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../features/services/servicesSlice";
import blogsReducer from "../features/blogs/blogsSlice";
import contactReducer from "../features/contact/contactSlice";
import productsReducer from "../features/products/productsSlice";
import authReducer from "../features/auth/authSlice";
import careersReducer from "../features/careers/careersSlice";
import homeReducer from "../features/home/homeSlice";

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    blogs: blogsReducer,
    contact: contactReducer,
    products: productsReducer,
    auth: authReducer,
    careers: careersReducer,
    home: homeReducer,
  },
});
