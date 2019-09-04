import {combineReducers} from 'redux'
import userReducer from './userReducer'
import categoriesReducer from './categoriesReducer';
import productsReducer from './productsReducer'

const reducers = combineReducers({
  UserReducer: userReducer,
  CategoriesReducer: categoriesReducer,
  ProductReducer: productsReducer
  
})

export default reducers
