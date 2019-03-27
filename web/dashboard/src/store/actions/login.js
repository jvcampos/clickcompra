import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function userLogin(email, password){
    return dispatch => {
      api.post('login', { email, password })
      .then(res => {
          console.log(res)
          // dispatch(res.data)
          return {
              type: 'USERr_LOGIN',
              email,
              password,
          }
        }).catch((error) => {
          console.log(`Error ==> ${error}`)
        })
    }
}