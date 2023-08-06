import { createSlice } from "@reduxjs/toolkit";

export const userSlices = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem('userTotalInfo')
        ?
        JSON.parse(localStorage.getItem('userTotalInfo'))
        :
        null
        ,
    },

    reducers:{
        activeUser: (state, action)=>{
            state.userInfo = action.payload
            console.log(action.payload);
        }
    }
})

export const {activeUser} = userSlices.actions

export default userSlices.reducer