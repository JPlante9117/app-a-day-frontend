export const getJobs = () => {
    return dispatch => {
        dispatch({type: "LOADING_JOBS"})
        return fetch('http://localhost:3001/jobs')
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: "JOBS_LOADED", payload: data})
        })
    }
}

export const updateJob = (job) => {
    return dispatch => {
        dispatch({type: "LOADING_JOBS"})
        return fetch(`http://localhost:3001/jobs/${job.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(job)
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: "UPDATE_JOB_COMPLETE", payload: data})
        })
    }
}

export const createJob = job => {
    console.log(6)
    return dispatch => {
        dispatch({type: "LOADING_JOBS"})
        return fetch(`http://localhost:3001/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(job)
        })
        .then(resp => {
            return resp.json()})
        .then(data => {
            console.log(7)
            dispatch({type: "CREATE_JOB", payload: data})
        })
        .catch(error => {
            console.log(8)
            console.log(error)
        })
        console.log(9)
    }
    console.log(10)
}

export const deleteJob = id => {
    return dispatch => {
        dispatch({type: "LOADING_JOBS"})
        return fetch(`http://localhost:3001/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        .then(data => {
            dispatch({type: "DELETE_JOB", payload: id})
        })
    }
}