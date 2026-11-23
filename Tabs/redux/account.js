// Actions

import { act, useReducer } from "react";

// Types
export const CHANGE_USER='CHANGE_USER';
export const CHANGE_GROUP='CHANGE_GROUP';

// Defined Actions
export const changeUser=(parameter)=>(
    {
        type:CHANGE_USER,
        payload:parameter
    }
)
export const changeGroup=(parameter)=>(
    {
        type:CHANGE_GROUP,
        payload:parameter
    }
)

// Reducer
const initialState={
    username:null,
    email:null,
    firstname:null,
    lastname:null,
    group:null
};

const accountReducer = (state=initialState,action)=>{
    switch(action.type){
        case CHANGE_USER:{
            // const {username, email, firstname, lastname, group} = state;
            const username = action.payload.username;
            const email = action.payload.email;
            const firstname = action.payload.firstname;
            const lastname = action.payload.lastname;
            const group = state.group;

            const newState = {username, email, firstname, lastname, group};
            return newState;
        }
        case CHANGE_GROUP: {
            const group = action.payload.group;
            const newState = {
                username:state.username, 
                email:state.username,
                firstname: state.firstname,
                lastname: state.lastname,
                group: group
            }
            return newState
        }
        default:
            return state;
    }
}

export default accountReducer;