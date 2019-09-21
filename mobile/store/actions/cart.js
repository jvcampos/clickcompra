import superagent from 'superagent'

export const addProduct = (product) => {
  return (dispatch) => {
    superagent
    .post('http://10.0.2.2:3001/api/cart')
    .query({
      product_id: product.id,
      add: true,
    }).then((resp) => {
      dispatch({type: 'ADD_PRODUCT', product})
      console.log(resp)
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const removeFromCart = (product) => {
  console.log(product)
  return (dispatch) => {
    superagent
    .post('http://10.0.2.2:3001/api/cart')
    .query({
      product_id: product.id,
    }).then((resp) => {
      dispatch({type: 'REMOVE_FROM_PRODUCT', product})
      console.log(resp)
    }).catch((e) => {
      console.log(e)
    })
  }
}
