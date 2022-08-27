export const CREATE_CART_ITEM = 'create_cart_item'
export const INCREASE_QUANTITY = 'increase_quantity'
export const DECREASE_QUANTITY = 'decrease_quantity'


export function createCartItem(data, selectedAttributes=null){
 const {name, brand, attributes, gallery, prices } = data
 const cartItem = {name, brand, prices, qty: 1, gallery, attributes, selectedAttributes}

 return {
    type: CREATE_CART_ITEM,
    payload: cartItem
 }
}

export function increaseQuantity(cartItem){

   return {
      type: INCREASE_QUANTITY,
      payload: cartItem
   }
}

export function decreaseQuantity(cartItem){

   return {
      type: DECREASE_QUANTITY,
      payload: cartItem
   }
}
