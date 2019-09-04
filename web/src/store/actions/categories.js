import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
})

export function addCategorie(name_categorie, description) {
    return (dispatch) => {
        return api.post('category', {name_categorie, description }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch(newCategory(response.data))
            })
    }
}

export function getCategories() {
    return (dispatch) => {
        api.get(`categories`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch(getAllCategories(response.data))
            })
    }
}


export function deleteCategory(id) {
    return (dispatch) => {
        api.delete(`category/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch(removeCategory(response.data))
            })
    }
}

export function updateCategory(id_category, name_categorie, description) {
    return (dispatch) => {
        api.put(`category/${id_category}`, { name_categorie, description }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                this.getCategories(localStorage.getItem('id'))
            })
    }
}


export const getAllCategories = (data) => {
    return {
        type: 'GET_ALL_CATEGORY',
        data
    }
}

export const newCategory = (data) => {
    return {
        type: 'ADD_CATEGORY',
        data
    }
}

export const removeCategory = (data) => {
    return {
        type: 'DELETE_CATEGORY',
        id: data.data.id
    }
}
