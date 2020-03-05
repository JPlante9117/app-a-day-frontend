import React from 'react'
import Goal from '../components/Goal'

class Goals extends React.Component {

    state = {
        goals: []
    }

    render(){
        let goals
        if (this.props.history.location.pathname === "/goals/complete"){
            goals = this.props.goals.filter(goal => goal.completed === true)
        } else {
            goals = this.props.goals.filter(goal => goal.completed === false)
        }
        let renderGoals = goals.map(goal => <Goal id={goal.id} key={goal.id} title={goal.title} description={goal.description} complete={goal.completed} due_date={goal.due_date} />)
        return(
            <div>
                <h2>GOALS</h2>
                {renderGoals}
            </div>
        )
    }
}

export default Goals