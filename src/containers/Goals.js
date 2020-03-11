import React from 'react'
import Goal from '../components/Goal'
import Modal from '../components/Modal'
import GoalForm from '../components/GoalForm'
import { connect } from 'react-redux'

import { updateGoal, deleteGoal } from '../actions/goals'

import moment from 'moment'


class Goals extends React.Component {

    state = {
        show: false
    }

    handleCompleteClick = (goal) => {
        this.props.updateGoal(goal)
    }

    handleDeleteClick = (id) => {
        this.props.deleteGoal(id)
    }

    toggleModal = e => {
        this.setState({
            show: !this.state.show
        })
    }

    renderPastDue = (goals) => {
        return(
            <div className="pastDueGoals">
                <h2>PAST DUE</h2>
                {goals.map(goal => <Goal goal={goal} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} />)}
                <div className="divider" />
            </div>
        )
    }

    render(){
        let goals = this.props.goals.filter(goal => goal.completed === false).sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
        let pastDue = goals.filter(goal => new Date(goal.due_date) < new Date(moment()))
        goals = goals.filter(goal => !pastDue.includes(goal))
        let completedGoals = this.props.goals.filter(goal => goal.completed === true).sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
        let renderGoals = goals.map(goal => <Goal goal={goal} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} />)
        let renderCompletedGoals = completedGoals.map(goal => <Goal goal={goal} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} />)

        return(
            <div>
                <div className="goalNewRow">
                    <button className="createGoal" onClick={this.toggleModal}>Set New Goal</button>
                </div>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <GoalForm toggleModal={this.toggleModal} onClose={this.toggleModal} />
                </Modal>
                {pastDue.length > 0 ? this.renderPastDue(pastDue) : null}
                <div className="currentGoals">
                    <h2>Current Goals</h2>
                    {renderGoals}
                </div>
                <hr />
                <h2>Completed Goals</h2>
                {renderCompletedGoals}
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        goals: state.goalsState.goals
    }
}

export default connect(mapStateToProps, { updateGoal, deleteGoal })(Goals)