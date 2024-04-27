import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    error:null,
     loading:false
}
const userSlice = createSlice(
{    name:"user",
initialState,
reducers: {
    signInStart: (state)=>{
        state.loading=true;
        state.error=null;

    },
    signInSuccess : (state,action)=>{
        state.currentUser=action.payload;
        state.error=null; 
        state.loading=false; 
        console.log("hewe" + state.currentUser +"khoomti")
        
    },
    signInFailure : (state, action)=> {
        state.loading=false; 
        state.error=action.payload;
        
    },
    signInRedo : (state)=> {
        state.loading=false; 
        state.error=null;
    }

}
    }
);

export const {signInStart,signInSuccess,signInFailure,signInRedo} = userSlice.actions;

export default userSlice.reducer;