import { AddItemToCart,DeleteItemToCart,IncrementCartItem,DecrementCartItem, EmptyCart } from "../ActionTypes/CartActionsTypes";

export const CartReducer = (state = [],action) =>{
    switch(action.type){
        case AddItemToCart:
            return addItemFunction(state,'productId',action.title)
        case DeleteItemToCart:
            return removeByAttr(state,'productId',action.title.productId);
        case EmptyCart:
            return [];
        case IncrementCartItem:
            return incrementQuantityFunction(state,'productId',action.title.productId);
        case DecrementCartItem:
            return decrementQuantityFunction(state,'productId',action.title.productId);
        default:
            return state;
    }
}
var addItemFunction = function(state_old, productIdAttribute,cartItem){
    let state = [...state_old];
    var i = state.length;
    let quantity_updated=false;
    while(i--){
        if(state[i]
            && state[i].hasOwnProperty(productIdAttribute) && state[i].hasOwnProperty('productId')
            && (arguments.length>2 && state[i][productIdAttribute] === cartItem['productId']))
            {
                state[i]['quantity'] +=cartItem['quantity'];
                quantity_updated=true;
            }
    }
    if(quantity_updated === false)
    {
        state = [...state,cartItem];
    }
    return [...state];
}
var removeByAttr = function(arr, attr, value){
    var newArr = [...arr];
    var i = newArr.length;
    while(i--){
       if( newArr[i] 
           && newArr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && newArr[i][attr] === value ) ){ 
            newArr.splice(i,1);
       }
    }
    return newArr;
}
var incrementQuantityFunction = function(state, productIdAttribute ,productIdvalue){
    var i = state.length;
    let newState = [...state];
    while(i--){
        if(newState[i]
            && newState[i].hasOwnProperty(productIdAttribute) && newState[i].hasOwnProperty('quantity')
            && (arguments.length>2 && newState[i][productIdAttribute] === productIdvalue))
            newState[i]['quantity'] +=1;
    }
    return [...newState];
}
var decrementQuantityFunction = function(state_old, productIdAttribute ,productIdvalue){
    let state = [...state_old];
    var i = state.length;
    while(i--){
        if(state[i]
            && state[i].hasOwnProperty(productIdAttribute) && state[i].hasOwnProperty('quantity')
            && (arguments.length>2 && state[i][productIdAttribute] === productIdvalue))
            state[i]['quantity'] -=1;
    }
    return [...state];
}