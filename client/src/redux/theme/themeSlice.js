import { createSlice } from '@reduxjs/toolkit'


const initialState = {
        theme:"light"
}
const userSlice = createSlice(
{    name:"theme",
initialState,
reducers: {
   toggle: (state)=>{
 if(state.theme==="dark"){
    state.theme = "light"
 }
 else  
  state.theme="dark"

   }

}
    }
);

export const {toggle} = userSlice.actions;

export default userSlice.reducer;