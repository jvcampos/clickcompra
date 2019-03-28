import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import history from '../../routes/history'
import login from './login'

const rootReducer = combineReducers({
    login,
    router: connectRouter(history)
})

export default rootReducer;