import React from 'react'
import Goal from '../components/Goal'
import Modal from '../components/Modal'
import GoalForm from '../components/GoalForm'

class Goals extends React.Component {

    state = {
        goals: [],
        show: false
    }

    toggleModal = e => {
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        let goals = this.props.goals.filter(goal => goal.completed === true)
        let completedGoals = this.props.goals.filter(goal => goal.completed === false)
        let renderGoals = goals.map(goal => <Goal id={goal.id} key={goal.id} title={goal.title} description={goal.description} complete={goal.completed} due_date={goal.due_date} />)
        let renderCompletedGoals = completedGoals.map(goal => <Goal id={goal.id} key={goal.id} title={goal.title} description={goal.description} complete={goal.completed} due_date={goal.due_date} />)

        
        return(
            <div>
                <button className="createGoal" onClick={this.toggleModal}>Set New Goal</button>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <GoalForm toggleModal={this.toggleModal} onClose={this.toggleModal} />
                </Modal>
                <h2>GOALS</h2>
                {renderGoals}
                <hr />
                {renderCompletedGoals}
                
            </div>
        )
    }
}

export default Goals