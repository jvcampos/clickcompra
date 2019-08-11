import {combineReducers} from 'redux'
import userReducer from './userReducer'

const reducers = combineReducers({
  UserReducer: userReducer
})

export default reducers