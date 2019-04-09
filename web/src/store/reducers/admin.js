export default function admin(state = {} , action) {
  // console.log(action)
  switch(action.type){
    case 'SUCCESS_GET_SUPERMARKETS':
      return {
          ...state,
          data: action.data
        }
      default:
        return state;
    }
 }
