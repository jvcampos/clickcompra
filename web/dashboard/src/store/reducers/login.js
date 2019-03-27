/* eslint-disable default-case */
const INIITAL_STATE = []

export default function login(state = INIITAL_STATE , action) {
   switch(action.type){
       case 'USER_LOGIN':
          return {
              email: action.email,
              password: action.password
          };
   }
   return state;
}