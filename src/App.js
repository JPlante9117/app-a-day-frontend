import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './containers/Dashboard';
import { connect } from 'react-redux';
import { getGoals } from './actions/goals'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Goals from './containers/Goals'
import GoalForm from './components/GoalForm'

class App extends React.Component {

  componentDidMount() {
    this.props.getGoals()
  }

  render(){
    return (
      <div>
          <Router>
            <Route exact path={"/dashboard"} component={Dashboard} />
            <Route exact path={"/goals"} render={props => <Goals goals={this.props.goals} />} />
            <Route exact path={"/goals/new"} component={GoalForm} />
            <Route exact path={"/goals/complete"} render={props => <Goals goals={this.props.goals} /> } />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      goals: state.goalsState.goals
  }
}

export default connect(mapStateToProps, { getGoals })(App)
