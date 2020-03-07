import React from 'react'
import { connect } from 'react-redux'

import { createGoal } from '../actions/goals'

class GoalForm extends React.Component {

    state = {
        title: "",
        description: "",
        completed: false,
        due_date: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("submitting . . .")
        this.props.createGoal(this.state)
        this.setState({
            title: "",
            description: "",
            completed: false,
            due_date: ""
        })
        this.props.toggleModal()
    }

    render() {
        return(
            <div>
                <h2>Set a New Goal</h2>
                <form onSubmit={this.handleSubmit} >
                    <h3>Name the Goal</h3>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Give the Goal a Title" maxLength="20" required />
                    <h3>Describe the Goal</h3>
                    <textarea rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange} maxLength="80" placeholder="Supply a brief description (max 80 characters)" required />
                    <h3>When Do You Want It Done?</h3>
                    <input type="text" name="due_date" value={this.state.due_date} onChange={this.handleChange} placeholder="DD/MM/YYYY" maxLength="10" required />
                    <br/><br/>
                    <input type="submit" value="Set Goal" /> <button className="cancelButton" onClick={e => this.props.onClose(e)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { createGoal })(GoalForm)