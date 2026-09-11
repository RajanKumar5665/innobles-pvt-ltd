import { configureStore } from "@reduxjs/toolkit";

// Each feature module (about, auth, careers, etc.) has its own slice
// that manages its data along with loading/error state.
import aboutReducer from "../features/about/aboutSlice";
import authReducer from "../features/auth/authSlice";
import careersReducer from "../features/careers/careersSlice";
import contactReducer from "../features/contact/contactSlice";
import productsReducer from "../features/products/productsSlice";
import servicesReducer from "../features/services/servicesSlice";

// This is where all the reducers come together to form the global store.
export const store = configureStore({
  reducer: {
    about: aboutReducer,
    auth: authReducer,
    careers: careersReducer,
    contact: contactReducer,
    products: productsReducer,
    services: servicesReducer,
  },
});