const userReducer = (state = {
  name: '',
  email: '',
  password: '',
  cpf: '',
  address: '',
  role: 2,
  mobile: 1,
  redirect: false
}, action) => {
  switch (action.type) {
    case 'REGISTER':
      state = {
        ...state,
        redirect: action.payload.redirect,
        message: action.payload.message
      }
    case 'UPDATE_USER':
      state = {
        ...state,
        ...action.payload,
      }
    case 'LOGIN':
      state = {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default userReducer
