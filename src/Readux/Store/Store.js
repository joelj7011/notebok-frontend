import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../Slice/UserSlice";
const Store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default Store;