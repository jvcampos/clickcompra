
import _ from 'lodash';
const INITIAL_STATE = [];

const cartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'ADD_PRODUCT':
      if(action.product.add){
        if(_.find(state, ['product_id', parseInt(action.product.product_id)])){

          const oldProduct = _.find(state, ['product_id', parseInt(action.product.product_id)])

          if(oldProduct.qtd !== action.product.qtd){
            let newState = state.filter((state) => state.product_id !== oldProduct.product_id);
            return [...newState, action.product]
          } else {
            return state
          }
        }
        return [...state, action.product]
      }
      case 'REMOVE_FROM_PRODUCT':
            const oldProduct = _.find(state, ['product_id', parseInt(action.product.product_id)])
            if(oldProduct.qtd !== action.product.qtd){
              let newState = state.filter((state) => state.product_id !== oldProduct.product_id);
              return [...newState, action.product]
            } else {
              return state
            }
      
      case 'LOAD_CART': 
        return [...state, ...action.products]
    default:
      return state
  }
}

export default cartReducer
