import React from 'react'
import { connect } from 'react-redux'

import { updateGoal, deleteGoal } from '../actions/goals'

class Goal extends React.Component {

    state = {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        due_date: this.props.due_date,
        completed: this.props.complete
    }

    changeComplete = () => {
        this.props.updateGoal(this.state)
        this.setState({
            completed: !this.state.completed
        })
    }

    deleteGoal = () => {
        this.props.deleteGoal(this.state.id)
    }

    render(){
        let {title, description, due_date, completed} = this.state
        return(
            <div>
                Title: {title}<br/>
                Descr: {description}<br/>
                Due: {due_date}<br/>
                Completed: {completed ? "Yes" : "No"}<br/>
                <button onClick={this.changeComplete}>{completed ? "Undo Complete" : "Mark Complete"}</button>
                <button onClick={this.deleteGoal}>Remove Goal</button>
            </div>
        )
    }
}

export default connect(null, { updateGoal, deleteGoal })(Goal)