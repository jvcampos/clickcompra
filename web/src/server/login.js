import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default(email, password) => {
  return api.post('login', { email, password })
}
