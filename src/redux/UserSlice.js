import { createSlice } from "@reduxjs/toolkit";
import { deletter, getter, setter } from "../hooks/useLocalStorage";

const user = getter({ key: "user" })?.user || {};
const isLogged = Object.keys(user).length > 0;
const initialState = {
    user : user,
    isLogged: isLogged
}
const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser(state, {payload}) {
            state.user = payload;
            setter({key: "user", setValue: payload});  
            state.isLogged = true;
        },
        deleteUser(state){
            state.user = {};
            deletter({key: "user"});
            state.isLogged = false;
        }
    }
});
export const {setUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;  