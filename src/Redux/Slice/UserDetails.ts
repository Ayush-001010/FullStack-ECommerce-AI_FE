import { createSlice } from "@reduxjs/toolkit";
import type UserDetailsInterface from "../../Interface/Redux/UserDetailsInterface";

const initialState : UserDetailsInterface = {
    isSignedIn: false,
};

const UserDetailsSlice  = createSlice({
    name: "UserDetails",
    initialState,
    reducers: {
        setSignedIn : (state, action) => {
            state.isSignedIn = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    }
});

export const { setSignedIn } = UserDetailsSlice.actions;
export default UserDetailsSlice.reducer;