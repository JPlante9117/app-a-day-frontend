import { combineReducers } from "redux"
import goalsReducer from "./goalsReducer"

const rootReducer = combineReducers({
    goalsState: goalsReducer
})

export default rootReducer