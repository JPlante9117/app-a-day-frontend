import { combineReducers } from "redux"
import goalsReducer from "./goalsReducer"
import jobsReducer from "./jobsReducer"

const rootReducer = combineReducers({
    goalsState: goalsReducer,
    jobsState: jobsReducer
})

export default rootReducer