import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "../Slices/UserSlices";
import activeChatReducer from '../Slices/ActioveChatSlice/ActiveChatSlice'

export default configureStore({
    reducer: {
        userData: UserSlices,
        activeChat: activeChatReducer,
    },
})