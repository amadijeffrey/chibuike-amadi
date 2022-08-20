export const SET_CATEGORY = 'set_category'
 
function setCategory(category){
return {
          type: SET_CATEGORY,
          payload:category
       }
}

export default setCategory