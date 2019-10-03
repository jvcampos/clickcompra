import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default (email) => {
  return api.post('forgotPassword', { email })
}
