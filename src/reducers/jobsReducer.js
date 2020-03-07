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
                ...state,
                jobs: action.payload,
                loading: false
            }

        case "UPDATE_JOB_COMPLETE":
            
            return {
                ...state,
                jobs: [...state.jobs.map(job => {
                    return job.id === action.payload.id ? action.payload : job
                })]
            }

        case "CREATE_JOB":
            debugger
            return {
                ...state,
                jobs: [...state.jobs, action.payload]
            }

        case "DELETE_JOB":
            return {
                ...state,
                jobs: state.jobs.filter(job => job.id !== action.payload)
            }

        default:
            return state
    }
}