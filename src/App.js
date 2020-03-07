import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './containers/Dashboard';
import { connect } from 'react-redux';
import { getGoals } from './actions/goals'
import { getJobs } from './actions/jobs'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Jobs from './containers/Jobs'
import Goals from './containers/Goals'

class App extends React.Component {

  componentDidMount() {
    this.props.getGoals()
    this.props.getJobs()
  }

  render(){
    return (
      <div>
          <Router>
            <Route exact path={"/dashboard"} component={Dashboard} />
            <Route exact path={"/goals"} component={Goals} />
            <Route exact path={"/jobs"} component={Jobs} />
        </Router>
      </div>
    );
  }
}

export default connect(null, { getGoals, getJobs })(App)
