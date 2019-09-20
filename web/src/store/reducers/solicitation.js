//Reducer
export default function solicitation(state = {}, action) {
  switch(action.type) {
    case 'SUCCESS_SOLICITATION':
      return {
          ...state,
          status: action.status,
          title: action.title,
          message: action.message,
        }
        case 'ERROR_SOLICITATION':
         return {
           ...state,
           status: action.status,
           title: action.title,
           message: action.message,
         }
      default:
        return state;
    }
  }