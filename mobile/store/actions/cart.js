import superagent from 'superagent'
import _ from 'lodash';
export const addProduct = (product) => {
  return (dispatch) => {
    superagent
    .post('http://10.0.2.2:3001/api/cart')
    .query({
      product_id: product.id,
      // aqui tem que passar o id do usuário
      add: true,
    }).then((resp) => {
      const test = {...JSON.parse(resp.text), product_id: parseInt(product.id), add: true}
      dispatch({type: 'ADD_PRODUCT', product: test})

    }).catch((e) => {
      console.log(e)
    })
  }
}

export const removeFromCart = (product) => {
  return (dispatch) => {
    superagent
    .post('http://10.0.2.2:3001/api/cart')
    .query({
      product_id: product.product_id,
    }).then((resp) => {
      console.log(JSON.parse(resp.text))
      const test = {...JSON.parse(resp.text)}
      dispatch({type: 'REMOVE_FROM_PRODUCT', product: test})
      console.log(resp)
    }).catch((e) => {
      console.log(e)
    })
  }
}

export const loadCart = (products) => ({type: 'LOAD_CART', products})
