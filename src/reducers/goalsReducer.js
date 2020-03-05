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
                goals: action.payload,
                loading: false
            }

        case "CHANGING_COMPLETE_STATUS":
            return {
                ...state,
                loading: true
            }

        case "STATUS_CHANGE_COMPLETE":
            let idx = state.goals.findIndex(goal => goal.id === action.payload.id)
            let updatedGoal = state.goals[idx]

            if (updatedGoal === state.goals[state.goals.length - 1]){
                return {
                    goals: [...state.goals.slice(0, idx), updatedGoal]
                }
            } else {
                return {
                    goals: [...state.goals.slice(0, idx), updatedGoal, ...state.goals.slice(idx + 1)],
                    loading: false
                }
            }

        case "CREATE_GOAL":
            return {
                goals: [...state.goals, action.payload]
            }

        default:
            return state
    }
}