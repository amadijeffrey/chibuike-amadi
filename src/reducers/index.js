import { combineReducers } from "@reduxjs/toolkit";
import selectedCurrencyReducer from './selectedCurrencyReducer';
import selectedCategoryReducer from "./setCategoryReducer";

const rootReducer = combineReducers({
    selectedCurrency: selectedCurrencyReducer,
    selectedCategory: selectedCategoryReducer
})

export default rootReducer