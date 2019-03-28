import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function userLogin(email, password){
  return (dispatch) => {
    return api.post('login', { email, password })
    .then(response => {
      dispatch(loginSucess(response.data, email, password))
    })
    .catch((error) => {
      throw error(error)
    })
  }
}

export const loginSucess = (data, email, password) => {
  return {
    type: 'USER_LOGIN',
    email,
    password,
    data
  }
}