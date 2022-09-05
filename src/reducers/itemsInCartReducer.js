import { CREATE_CART_ITEM } from "../actions/cartItemActions";
import { INCREASE_QUANTITY } from '../actions/cartItemActions';
import { DECREASE_QUANTITY } from "../actions/cartItemActions";

function itemsInCartReducer(state=[],action){
  switch(action.type){
    case CREATE_CART_ITEM: 
    const foundProduct = state.find(cartItem => JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(action.payload.selectedAttributes))
    if(foundProduct){
      return state.map( cartItem => 
        JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(action.payload.selectedAttributes) ?
        {...cartItem, qty: cartItem.qty + 1}
        :
        cartItem
        )
      }
      return [...state, action.payload]
      
    case INCREASE_QUANTITY:
    return state.map( cartItem => 
      JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(action.payload.selectedAttributes) ?
      {...cartItem, qty: cartItem.qty + 1}
      :
      cartItem
      )

    case DECREASE_QUANTITY:
    return state.reduce( (acc,cartItem) => {
      if(JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(action.payload.selectedAttributes)){
        if(cartItem.qty === 1) return acc
        return [...acc, {...cartItem, qty: cartItem.qty - 1}]
      }
      return [...acc, cartItem]
    },[])
      
    default: return state
  }
} 

export default itemsInCartReducer