import { combineReducers } from "@reduxjs/toolkit";
import selectedCurrencyReducer from './selectedCurrencyReducer'

const rootReducer = combineReducers({
    selectedCurrency: selectedCurrencyReducer
})

export default rootReducer