import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

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
    },
    updateStart: (state) => {
        state.loading=true;
        state.error=false
    },
    updateSuccess : (state,action) => {
        state.currentUser=action.payload;
        state.loading=false; 
        state.error=null;

    },
    updateFailure : (state,action) => {
        state.loading=false;
        state.error=action.payload;

    },
    deleteUserStart : (state)=> {
        state.loading=true;
        state.error=null; 
    },

    deleteUserSuccess : (state)=> {
        state.loading=false;
        state.error=null; 
        state.currentUser=null; 

    },
    deleteUserFailure : (state,action)=> {
        state.loading=false;
        state.error=action.payload; 
      //  state.currentUser=null; 

    },

}
    }
);

export const {signInStart,signInSuccess,signInFailure,signInRedo,updateFailure,updateStart,updateSuccess, deleteUserFailure,deleteUserStart,deleteUserSuccess} = userSlice.actions;

export default userSlice.reducer;