export const getGoals = () => {
    return dispatch => {
        dispatch({type: "LOADING_GOALS"})
        return fetch('http://localhost:3001/goals')
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: "GOALS_LOADED", payload: data})
        })
    }
}

export const updateGoal = (goal) => {
    return dispatch => {
        dispatch({type: "CHANGING_COMPLETE_STATUS"})
        return fetch(`http://localhost:3001/goals/${goal.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(Object.assign({}, goal, {completed: !goal.completed}))
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: "STATUS_CHANGE_COMPLETE", payload: data})
        })
    }
}

export const createGoal = goal => {
    return dispatch => {
        dispatch({type: "LOADING_GOALS"})
        return fetch(`http://localhost:3001/goals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(goal)
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({type: "CREATE_GOAL", payload: data})
        })
    }
}

export const deleteGoal = id => {
    return dispatch => {
        dispatch({type: "LOADING_GOALS"})
        return fetch(`http://localhost:3001/goals/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        })
        .then(data => {
            dispatch({type: "DELETE_GOAL", payload: id})
        })
    }
}