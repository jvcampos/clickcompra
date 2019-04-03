export default function login(state = {} , action) {
   switch(action.type){
     case 'USER_SUCCESS_LOGIN':
      return {
          ...state,
          email: action.email,
          password: action.password,
          token: action.data.token
        }
      case 'USER_ERROR_LOGIN' :
        return {
          ...state,
          error: action.message
        }
      default:
        return state;
   }
}