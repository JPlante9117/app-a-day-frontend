import React from 'react'
import { connect } from 'react-redux'
import { getGoals } from '../actions/goals'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Goals from './Goals'
import GoalForm from '../components/GoalForm'

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getGoals()
    }
    
    render() {
        return(
            <Router>
                <Route exact path={"/goals"} render={props => <Goals goals={this.props.goals}/>} />
                <Route exact path={"/goals/new"} component={GoalForm} />
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        goals: state.goalsState.goals
    }
}

export default connect(mapStateToProps, { getGoals })(Dashboard)