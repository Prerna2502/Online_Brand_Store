import { SetCustomerLogedIn } from "../ActionTypes/customerLogedInType";

export const customerLogedInReducer = (state = false,action) =>{
    switch(action.type){
        case SetCustomerLogedIn:
            return action.title;
        default:
            return state;
    }
} 