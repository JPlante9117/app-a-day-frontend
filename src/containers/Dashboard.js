import React from 'react'
import { connect } from 'react-redux'
import { getGoals, updateGoal } from '../actions/goals'
import Goal from '../components/Goal'

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getGoals()
    }

    markComplete = (goal) => {
        this.props.updateGoal(goal)
    }
    
    render() {
        const renderGoals = this.props.goals.map(goal => <Goal markComplete={this.markComplete} id={goal.id} key={goal.id} title={goal.title} description={goal.description} complete={goal.completed} due_date={goal.due_date} />)
        return(
            <div>
                <h2>GOALS</h2>
                    {renderGoals}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        goals: state.goalsState.goals
    }
}

export default connect(mapStateToProps, { getGoals, updateGoal })(Dashboard)