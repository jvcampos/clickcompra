import { push } from "connected-react-router";
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function userLogin(email, password){
  return (dispatch) => {
    return api.post('login', { email, password })
    .then(response => {
      dispatch(loginSucess(response.data, email, password))
      if (response.data.role === 'ADMIN'){
        dispatch(push("/admin"));
      } else {
        dispatch(push("/home"));
      }
    })
    .catch(() => {
      dispatch(loginError('Dados inseridos incorretos, verificar !'))
    })
  }
}

export const loginSucess = (data, email, password) => {
  return {
    type: 'USER_SUCCESS_LOGIN',
    email,
    password,
    data
  }
}

export const loginError = (message) => {
  return {
    type: 'USER_ERROR_LOGIN',
    status: 'error',
    message,
  }
}