export default function goalsReducer(state={
    goals: []
}, action){
    switch(action.type){
        case "LOADING_GOALS":
            return {
                ...state,
                loading: true
            }

        case "GOALS_LOADED":
            return {
                ...state,
                goals: action.payload,
                loading: false
            }

        case "CHANGING_COMPLETE_STATUS":
            return {
                ...state,
                loading: true
            }

        case "STATUS_CHANGE_COMPLETE":

            return {
                ...state,
                goals: [...state.goals.map(goal => {
                    return goal.id === action.payload.id ? action.payload : goal
                })]
            }

        case "UPDATE_COMPLETE":

            return {
                ...state,
                goals: [...state.goals.map(goal => {
                    return goal.id === action.payload.id ? action.payload : goal
                })]
            }

        case "CREATE_GOAL":
            return {
                ...state,
                goals: [...state.goals, action.payload]
            }

        case "DELETE_GOAL":
            return {
                ...state,
                goals: state.goals.filter(goal => goal.id !== action.payload)
            }

        default:
            return state
    }
}