import React from 'react'
import { connect } from 'react-redux'

import { createGoal } from '../actions/goals'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

class GoalForm extends React.Component {

    state = {
        id: this.props.goal.id,
        title: this.props.goal.title,
        description: this.props.goal.description,
        completed: this.props.goal.completed,
        due_date: new Date(this.props.goal.due_date)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDateChange = date => {
        this.setState({
            due_date: date
        })
    }

    render() {
        return(
            <div>
                <h2>Set a New Goal</h2>
                <form onSubmit={(event) => this.props.handleOnSubmit(event, this.state)} >
                    <h3>Name the Goal</h3>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Give the Goal a Title" maxLength="20" required />
                    <h3>Describe the Goal</h3>
                    <textarea rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange} maxLength="100" placeholder="Supply a brief description (max 100 characters)" required />
                    <h3>When Do You Want It Done?</h3>
                    <div className="calendarContainer">
                        <Calendar onChange={this.handleDateChange} value={this.state.due_date} />
                    </div>
                    <br/><br/>
                    <input type="submit" value={this.props.buttonLabel} /> <button className="cancelButton" onClick={e => this.props.onClose(e)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { createGoal })(GoalForm)