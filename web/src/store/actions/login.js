import { push } from "connected-react-router";
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function userLogin(email, password){
  return (dispatch) => {
    return api.post('login', { email, password })
    .then(response => {
      console.log(response)
      if (response.data.role === 'ADMIN'){
        dispatch(loginSucess(response.data, email, password, response.id_supermarket))
        dispatch(push("/admin"));
      } else if (response.data.status === 'APROVED'){
        dispatch(loginSucess(response.data, email, password))
        dispatch(push("/home"));
      } else {
        dispatch(loginError('Seu registro ainda não foi aprovado !'))
      }
    })
  }
}

export const loginSucess = (data, email, password, id, id_supermarket) => {
  return {
    type: 'USER_SUCCESS_LOGIN',
    email,
    password,
    data,
    id,
    id_supermarket,
  }
}

export const loginError = (message) => {
  return {
    type: 'USER_ERROR_LOGIN',
    status: 'error',
    message,
  }
}