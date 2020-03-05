import React from 'react'
import { connect } from 'react-redux'
import { getGoals } from '../actions/goals'
import Goal from '../components/Goal'

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getGoals()
    }
    
    render() {
        const renderGoals = this.props.goals.map(goal => <Goal id={goal.id} key={goal.id} title={goal.title} description={goal.description} complete={goal.completed} due_date={goal.due_date} />)
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

export default connect(mapStateToProps, { getGoals })(Dashboard)