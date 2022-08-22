import { CREATE_CART_ITEM } from "../actions/createCartItem";

function itemsInCartReducer(state=[],action){
  switch(action.type){
    case CREATE_CART_ITEM: return [...state, action.payload]
    default: return state
  }
} 

export default itemsInCartReducer