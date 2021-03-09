import { ADDTestCounter } from "../ActionTypes/testType";

export const TestReducer = (state = 0,action) =>{
    switch(action.type){
        case ADDTestCounter:
            return state + 1;
        default:
            return state;
    }
}