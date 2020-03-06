import React from 'react'
import { connect } from 'react-redux'
import '../goal.css'
import Moment from 'react-moment'

import { updateGoal, deleteGoal } from '../actions/goals'

class Goal extends React.Component {

    state = {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        due_date: this.props.due_date,
        completed: this.props.complete,
        class: `goal-${this.props.complete}`
    }

    changeComplete = () => {
        this.props.updateGoal(this.state)
        this.setState({
            completed: !this.state.completed,
            class: `goal-${!this.state.completed}`
        })
    }

    deleteGoal = () => {
        this.props.deleteGoal(this.state.id)
    }

    render(){
        let {title, description, due_date, completed} = this.state
        
        return(
            <div className={this.state.class} >
                <div className="goalContent">
                    <div className="goalTitle">{title}</div>
                    <div className="goalDescription">{description}</div>
                    <div className="">Due <Moment>{due_date}</Moment> </div>
                    Completed: {completed ? "Yes" : "No"}<br/>
                    <div className="goalButtonRow">
                        <button className="markComplete" onClick={this.changeComplete}>{completed ? "Undo Complete" : "Mark Complete"}</button>
                        <button className="removeGoal" onClick={this.deleteGoal}>Remove Goal</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { updateGoal, deleteGoal })(Goal)