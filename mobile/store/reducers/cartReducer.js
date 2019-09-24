
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
        console.log(state)
            const oldProduct = _.find(state, ['product_id', parseInt(action.product.product_id)])
            console.log(oldProduct)
            console.log(action.product)
            if(oldProduct.qtd !== action.product.qtd){
              console.log('centro do segundo if')

              let newState = state.filter((state) => state.product_id !== oldProduct.product_id);
              return [...newState, action.product]
            } else {
              console.log('centro do else')

              return state
            }
          console.log('fora do if')

          return state
    default:
      return state
  }
}

export default cartReducer
