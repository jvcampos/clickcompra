export default function login(state = {} , action) {
   switch(action.type){
     case 'USER_LOGIN':
     console.log(action)
      return {
          ...state,
          email: action.email,
          password: action.password,
          token: action.data.token
        }
      case 'ERROR_LOGIN' :
        return {
          error: action.error
        }
      default:
        return state;
   }
}