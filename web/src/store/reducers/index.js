import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import history from '../../routes/history'
import login from './login'
import renderComponent from './renderComponent'
import solicitation from './solicitation'
import admin from './admin'

const rootReducer = combineReducers({
    login,
    renderComponent,
    solicitation,
    admin,
    router: connectRouter(history)
})

export default rootReducer;