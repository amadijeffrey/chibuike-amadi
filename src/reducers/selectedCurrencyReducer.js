import { SET_CURRENCY } from "../actions/setSelectedCurrency";

function selectedCurrencyReducer(state = '$',action){
    switch(action.type){
        case SET_CURRENCY: return action.payload
        default: return state
    }
}

export default selectedCurrencyReducer