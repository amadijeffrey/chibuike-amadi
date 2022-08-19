 export const SET_CURRENCY = 'set_currency'
 
 function setSelectedCurrency(symbol){
 return {
           type: SET_CURRENCY,
           payload:symbol
        }
 }

 export default setSelectedCurrency