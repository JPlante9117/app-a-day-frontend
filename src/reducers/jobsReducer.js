export default function JOBSReducer(state={
    jobs: []
}, action){
    switch(action.type){
        case "LOADING_JOBS":
            return {
                ...state,
                loading: true
            }

        case "JOBS_LOADED":
            return {
                jobs: action.payload,
                loading: false
            }

        case "UPDATE_JOB_COMPLETE":
            let idx = state.jobs.findIndex(goal => goal.id === action.payload.id)
            let updatedJob = state.jobs[idx]

            if (updatedJob === state.jobs[state.jobs.length - 1]){
                return {
                    jobs: [...state.jobs.slice(0, idx), updatedJob]
                }
            } else {
                return {
                    jobs: [...state.jobs.slice(0, idx), updatedJob, ...state.jobs.slice(idx + 1)],
                    loading: false
                }
            }

        case "CREATE_JOB":
            return {
                jobs: [...state.jobs, action.payload]
            }

        case "DELETE_JOB":
            return {
                jobs: state.jobs.filter(job => job.id !== action.payload)
            }

        default:
            return state
    }
}