import { AddItemToCart,DeleteItemToCart,IncrementCartItem,DecrementCartItem, EmptyCart } from "../ActionTypes/CartActionsTypes";

export const AddCartItemAction = (data) => {
    return {
        type: AddItemToCart,
        title: data
    }
}
export const DeleteCartItemAction = (data) => {
    return {
        type: DeleteItemToCart,
        title: data
    }
}
export const IncrementCartItemAction = (data) => {
    return {
        type: IncrementCartItem,
        title: data
    }
}
export const DecrementCartItemAction = (data) => {
    return {
        type: DecrementCartItem,
        title: data
    }
}
export const EmptyCartAction = (data) => {
    return {
        type: EmptyCart,
        title: data
    }
}