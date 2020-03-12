import React from 'react'
import Goal from '../components/Goal'
import Modal from '../components/Modal'
import GoalForm from '../components/GoalForm'
import { connect } from 'react-redux'

import { updateGoal, updateCompletionGoal, deleteGoal } from '../actions/goals'

import moment from 'moment'


class Goals extends React.Component {

    state = {
        goal: {
            id: "",
            title: "",
            description: "",
            completed: false,
            due_date: ""
        },
        show: false,
        form: ''
    }

    handleCompleteClick = (goal) => {
        this.props.updateCompletionGoal(goal)
    }

    handleDeleteClick = (id) => {
        this.props.deleteGoal(id)
    }

    handleUpdateClick = (goal) => {
        this.setState({
            goal: goal,
            show: !this.state.show,
            form: 'edit'
        })
    }

    toggleModal = e => {
        this.setState({
            goal: {
                id: "",
                title: "",
                description: "",
                completed: false,
                due_date: ""
            },
            show: !this.state.show,
            form: ''
        })
    }

    handleSubmit = (event, goal) => {
        event.preventDefault()
        if (this.state.form === 'edit') {
            this.props.updateGoal(goal)
        } else {
            this.props.createGoal(goal)
        }
        this.toggleModal()
    }

    renderPastDue = (goals) => {
        return(
            <div className="pastDueGoals">
                <h2>Past Due!</h2>
                {goals.map(goal => <Goal goal={goal} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} handleOnUpdateClick={this.handleUpdateClick} />)}
                <div className="divider" />
            </div>
        )
    }

    renderCompletedGoals = (goals) => {
        return(
            <div className="completedGoals">
                <hr />
                <h2>Completed Goals</h2>
                {goals.map(goal => <Goal goal={goal} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} handleOnUpdateClick={this.handleUpdateClick} />)}
            </div>
        )
    }

    renderIncompleteGoals = (goals, pastDue) => {
        return(
            <div className="currentGoals">
                {pastDue.length > 0 ? <hr /> : null}
                <h2>Current Goals</h2>
                {goals.map(goal => <Goal goal={goal} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} handleOnUpdateClick={this.handleUpdateClick} />)}
            </div>
        )
    }

    render(){
        let goals = this.props.goals.filter(goal => goal.completed === false).sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
        let pastDue = goals.filter(goal => moment(goal.due_date).isBefore(moment().startOf('day')))
        goals = goals.filter(goal => !pastDue.includes(goal))
        let completedGoals = this.props.goals.filter(goal => goal.completed === true).sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
goals.map(goal => <Goal goal={goal} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} />)

        return(
            <div className="container">
                <div className="goalNewRow">
                    <button className="createGoal" onClick={this.toggleModal}>Set New Goal</button>
                </div>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <GoalForm toggleModal={this.toggleModal} onClose={this.toggleModal} goal={this.state.goal} buttonLabel={this.state.form === 'edit' ? "Update Goal" : "Set Goal"} handleOnSubmit={this.handleSubmit} />
                </Modal>
                {pastDue.length > 0 ? this.renderPastDue(pastDue) : null}
                {goals.length > 0 ? this.renderIncompleteGoals(goals, pastDue) : null }
                {completedGoals.length > 0 ? this.renderCompletedGoals(completedGoals) : null}
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        goals: state.goalsState.goals
    }
}

export default connect(mapStateToProps, { updateGoal, updateCompletionGoal, deleteGoal })(Goals)