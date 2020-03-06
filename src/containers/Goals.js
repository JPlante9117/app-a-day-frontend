import React from 'react'
import Goal from '../components/Goal'
import Modal from '../components/Modal'
import GoalForm from '../components/GoalForm'
import { connect } from 'react-redux'

import { updateGoal, deleteGoal } from '../actions/goals'


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

    render(){
        let goals = this.props.goals.filter(goal => goal.completed === false)
        let completedGoals = this.props.goals.filter(goal => goal.completed === true)
        let renderGoals = goals.map(goal => <Goal goal={goal} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} />)
        let renderCompletedGoals = completedGoals.map(goal => <Goal goal={goal} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} />)

        return(
            <div>
                <button className="createGoal" onClick={this.toggleModal}>Set New Goal</button>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <GoalForm toggleModal={this.toggleModal} onClose={this.toggleModal} />
                </Modal>
                <h2>Current Goals</h2>
                {renderGoals}
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