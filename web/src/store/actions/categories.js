// import { push } from "connected-react-router";
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export function addCategorie(id_supermarket, name_categorie, description){
  return (dispatch) => {
    return api.post('category', { id_supermarket, name_categorie, description }, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
  }
}

export function updateCategories(id){
    return (dispatch) => {
        return api.get(`categories/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response)
            dispatch(updatedCategories(response.data))
        })
      }
}

export const updatedCategories = (data) => {
    return {
        type: 'UPDATE_ALL_CATEGORIES',
        data
    }
}

