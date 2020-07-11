import { combineReducers } from 'redux'
import registrationState from './registration'
const registrationApp = combineReducers({
    registrationState
})
export default registrationApp;