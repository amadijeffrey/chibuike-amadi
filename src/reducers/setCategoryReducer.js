import { SET_CATEGORY } from "../actions/setCategory";

function selectedCategoryReducer(state = 'all',action){
    switch(action.type){
        case SET_CATEGORY: return action.payload
        default: return state
    }
}

export default selectedCategoryReducer