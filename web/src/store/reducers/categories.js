export default function categories(state = {} , action) {
    switch(action.type){
      case 'UPDATE_ALL_CATEGORIES':
       return {
           ...state,
           categories: action.data,
         }
       default:
         return state;
    }
 }