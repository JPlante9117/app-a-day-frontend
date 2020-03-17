import React from 'react'
import Goal from '../components/Goal'
import Modal from '../components/Modal'
import GoalForm from '../components/GoalForm'
import { connect } from 'react-redux'

import { createGoal, updateGoal, updateCompletionGoal, deleteGoal } from '../actions/goals'

import moment from 'moment'
import ScrollAnimation from 'react-animate-on-scroll'


class Goals extends React.Component {

    state = {
        goal: {
            id: "",
            title: "",
            description: "",
            completed: false,
            due_date: new Date()
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
                due_date: new Date()
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

    handleOnUpvoteClick = (event, goal) => {
        console.log(goal.id)
    }

    renderPastDue = (goals) => {
        return(
            <div className="pastDueGoals">
                <h2>Past Due!</h2>
                {goals.map(goal => <Goal goal={goal} likes={0} handleOnUpvoteClick={this.handleOnUpvoteClick} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} handleOnUpdateClick={this.handleUpdateClick} />)}
            </div>
        )
    }

    renderCompletedGoals = (goals) => {
        return(
            <div className="completedGoals">
                <hr />
                <h2>Completed Goals</h2>
                {goals.map(goal => <Goal goal={goal} likes={0} handleOnUpvoteClick={this.handleOnUpvoteClick} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} handleOnUpdateClick={this.handleUpdateClick} />)}
            </div>
        )
    }

    renderIncompleteGoals = (goals, pastDue) => {
        return(
            <div className="currentGoals">
                {pastDue.length > 0 ? <hr /> : null}
                <h2>Current Goals</h2>
                {goals.map(goal => <Goal goal={goal} likes={0} handleOnUpvoteClick={this.handleOnUpvoteClick} key={goal.id} handleOnDeleteClick={this.handleDeleteClick} handleOnCompleteClick={this.handleCompleteClick} handleOnUpdateClick={this.handleUpdateClick} />)}
            </div>
        )
    }

    render(){
        let goals = this.props.goals.filter(goal => goal.completed === false)
        let pastDue = goals.filter(goal => moment(goal.due_date).isBefore(moment().startOf('day'))).sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        goals = goals.filter(goal => !pastDue.includes(goal)).sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        let completedGoals = this.props.goals.filter(goal => goal.completed === true).sort((a, b) => new Date(b.due_date) - new Date(a.due_date))

        return(
            <div className="container">
                <ScrollAnimation animateIn="fadeInDown" offset={0} animateOnce={true}>
                <div className="goalNewRow">
                    <button className="createGoal" onClick={this.toggleModal}>Set New Goal</button>
                </div>
                </ScrollAnimation>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <GoalForm toggleModal={this.toggleModal} onClose={this.toggleModal} goal={this.state.goal} buttonLabel={this.state.form === 'edit' ? "Update Goal" : "Set Goal"} handleOnSubmit={this.handleSubmit} />
                </Modal>
                <ScrollAnimation animateIn="fadeInUp" offset={0} delay={250} animateOnce={true}>
                    {pastDue.length > 0 ? this.renderPastDue(pastDue) : null}
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeInUp" offset={0} delay={500} animateOnce={true}>
                {goals.length > 0 ? this.renderIncompleteGoals(goals, pastDue) : null }
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeInUp" offset={0} delay={750} animateOnce={true}>
                {completedGoals.length > 0 ? this.renderCompletedGoals(completedGoals) : null}
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" offset={0}>
                    {completedGoals.length === 0 && pastDue.length === 0 && goals.length === 0 ? <h1>All Caught Up! Set a New Goal!</h1> : ""}
                </ScrollAnimation>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        goals: state.goalsState.goals
    }
}

export default connect(mapStateToProps, { createGoal, updateGoal, updateCompletionGoal, deleteGoal })(Goals)