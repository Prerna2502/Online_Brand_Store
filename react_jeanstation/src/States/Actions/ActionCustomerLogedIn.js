import { SetCustomerLogedIn, } from "../ActionTypes/customerLogedInType";

export const SetCustomerLogedInAction = (data) => {
    return { 
        type: SetCustomerLogedIn,
        title: data
     }
}