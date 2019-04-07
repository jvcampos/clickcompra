import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function getSuperUnproved(){
    return (dispatch) => {
        return api.get('supermarkets/unproved', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then( response => {
            dispatch(successGetSupermarkets(response.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const successGetSupermarkets = (data) => {
    return {
        type: 'SUCCESS_GET_SUPERMARKETS',
        data,
    }
}