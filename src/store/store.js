import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "../Slices/UserSlices";

export default configureStore({
    reducer: {
        userData: UserSlices
    },
})