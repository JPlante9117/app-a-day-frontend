import React from 'react';
import './App.css';
import Dashboard from './containers/Dashboard';
import { connect } from 'react-redux';
import { getGoals } from './actions/goals'
import { getJobs } from './actions/jobs'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'animate.css/animate.min.css'
import Jobs from './containers/Jobs'
import Goals from './containers/Goals'
import NavBar from './components/NavBar';
import Home from './components/Home'

class App extends React.Component {

  componentDidMount() {
    this.props.getGoals()
    this.props.getJobs()
  }

  render(){
    return (
      <div>
        <Router>
          <NavBar />
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/dashboard"} component={Dashboard} />
          <Route exact path={"/goals"} component={Goals} />
          <Route exact path={"/jobs"} component={Jobs} />
        </Router>
      </div>
    );
  }
}

export default connect(null, { getGoals, getJobs })(App)