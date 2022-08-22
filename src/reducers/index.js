import { combineReducers } from "@reduxjs/toolkit";
import itemsInCartReducer from "./itemsInCartReducer";
import selectedCurrencyReducer from './selectedCurrencyReducer';
import selectedCategoryReducer from "./setCategoryReducer";

const rootReducer = combineReducers({
    selectedCurrency: selectedCurrencyReducer,
    selectedCategory: selectedCategoryReducer,
    cart: itemsInCartReducer
})

export default rootReducer