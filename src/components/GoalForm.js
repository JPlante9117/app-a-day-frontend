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
        this.props.history.push('/goals')
    }

    render() {
        return(
            <div>
                <h1>Set a New Goal</h1>
                <form onSubmit={this.handleSubmit} >
                    <h2>Name the Goal</h2>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <h2>Describe the Goal</h2>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <h2>When Do You Want It Done?</h2>
                    <input type="text" name="due_date" value={this.state.due_date} onChange={this.handleChange} />
                    <br/><br/>
                    <input type="submit" value="Set Goal" />
                </form>
            </div>
        )
    }
}

export default connect(null, { createGoal })(GoalForm)