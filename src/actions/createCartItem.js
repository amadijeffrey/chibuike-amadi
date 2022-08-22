export const CREATE_CART_ITEM = 'create_cart_item'

function createCartItem(data, selectedAttributes, price){
 const {name, brand, attributes, gallery, selectedCurrency } = data
 const cartItem = {name, brand, price, qty: 1, gallery, selectedCurrency, attributes, selectedAttributes}

 return {
    type: CREATE_CART_ITEM,
    payload: cartItem
 }
}

export default createCartItem