import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function managerSolicitation(dados) {
    return (dispatch) => {
        const { manager } = dados
        const { supermarket } = dados
        console.log(manager)
        return api.post('user', manager)
        .then(response => {
          const { id } = response.data.data
          dispatch(supermarketSolicitation(id, supermarket))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  
export const supermarketSolicitation = (id_manager, data_supermarket) => {
  return (dispatch) => {
    console.log(id_manager, data_supermarket)
    return api.post('supermarket', data_supermarket, id_manager)
      .then(response => {
        console.log(response)
      })
      .catch(() => {
        
      })
  }
}