import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api/',
})

export default function getSuperUnproved(){
    return (dispatch) => {
       const teste = api.get('supermarkets/unproved', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        console.log(teste)

        // .then(response => {
        //     // console.log(response)
        //     return dispatch(successGetSupermarkets(response.data))
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }
}

const successGetSupermarkets = (data) => {
    // console.log(data)
    return {
        type: 'SUCCESS_GET_SUPERMARKETS',
        data: data.data,
    }
}
