import { createSlice } from "@reduxjs/toolkit";
import type UserDetailsInterface from "../../Interface/Redux/UserDetailsInterface";

const initialState : UserDetailsInterface = {
    isSignedIn: false,
};

const UserDetailsSlice  = createSlice({
    name: "UserDetails",
    initialState,
    reducers: {}
});

export const {} = UserDetailsSlice.actions;
export default UserDetailsSlice.reducer;