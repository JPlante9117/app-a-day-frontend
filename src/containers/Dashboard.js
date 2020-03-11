import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GoalCalendar from '../components/BigCalendar'
import '../dashboard.scss'
import moment from 'moment'
import DashGoal from '../components/DashGoal'
import DashJob from '../components/DashJob'

class Dashboard extends React.Component {

    upcomingGoals = () => {

        const testWithinWeek = date => {
            let TODAY = moment().startOf('day')
            let WITHIN_WEEK = TODAY.clone().add(7, 'days').startOf('day')
            let testDate = moment(date).startOf('day')

            return (testDate.isBefore(WITHIN_WEEK) && (testDate.isAfter(TODAY, 'd') || testDate.isSame(TODAY, 'd')))
        }
        let incompleteGoals = this.props.goals.filter(goal => !goal.completed)
        let withinWeek = []
        incompleteGoals.forEach(goal => {
            if (testWithinWeek(goal.due_date)){
                withinWeek.push(goal)
            }
        })
        return withinWeek
    }

    displayUCGoals = () => {
        let upcomingGoals = this.upcomingGoals()
        debugger
        if (upcomingGoals.length <= 3){
            return upcomingGoals.map(goal => <Link to={"/goals"}><DashGoal goal={goal} /></Link> )
        } else {
            return upcomingGoals.slice(0, 3).map(goal => <Link to={"/goals"}><DashGoal goal={goal} /></Link>)
        }
    }

    pastDueGoals = () => {

        const testPastDue = date => {
            let TODAY = moment().startOf('day')
            let testDate = moment(date).startOf('day')

            return (testDate.isBefore(TODAY, 'd'))
        }

        let incompleteGoals = this.props.goals.filter(goal => !goal.completed)
        let overDue = []
        incompleteGoals.forEach(goal => {
            if (testPastDue(goal.due_date)){
                overDue.push(goal)
            }
        })
        return overDue
    }

    displayRecentJobs = () => {
        debugger
        let recentJobs = this.props.jobs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 3)
        return recentJobs.map(job => <DashJob job={job} />)
    }
    
    render() {
        return(
            <div className="grid" style={{paddingTop: "20px"}}>
                <main className="main">
                    <div className="main-overview">
                        <Link to={"/jobs"}><div className="overviewCard">
                            <div className="overviewCard-icon overviewCard-icon--apps">
                                <i className="far fa-file-alt"></i>
                            </div>
                            <div className="overviewCard-description">
                                <h3 className="overviewCard-title text-light">Your Applications</h3>
                                <p className="overviewCard-subtitle">{this.props.jobs.length} jobs</p>
                            </div>
                        </div></Link>
                        <Link to={"/goals"}><div className="overviewCard">
                            <div className="overviewCard-icon overviewCard-icon--comingup">
                                <i className="far fa-calendar-check"></i>
                            </div>
                            <div className="overviewCard-description">
                                <h3 className="overviewCard-title text-light">This Week's Goals</h3>
                                <p className="overviewCard-subtitle">{this.upcomingGoals().length > 0 ? this.upcomingGoals().length : "All Caught Up! Set a New Goal!"}</p>
                            </div>
                        </div></Link>
                        <Link to={"/goals"}><div className="overviewCard">
                            <div className="overviewCard-icon overviewCard-icon--pastdue">
                                <i className="far fa-envelope"></i>
                            </div>
                            <div className="overviewCard-description">
                                <h3 className="overviewCard-title text-light">Past Due Goals</h3>
                                <p className="overviewCard-subtitle">{this.pastDueGoals().length > 0 ? this.pastDueGoals().length : "All Caught Up!"}</p>
                            </div>
                        </div></Link>
                    </div>
                    <div className="main__cards">
                        <div className="card">
                            <div className="card__header">
                                <div className="card__header-title text-light">Calendar</div>
                            </div>
                            <div className="card__main">
                            <GoalCalendar />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card__header">
                                <div className="card__header-title text-light">Upcoming <strong>Goals</strong>
                                </div>
                            </div>
                            <div className="card">
                                {this.displayUCGoals().length > 0 ? this.displayUCGoals() : <h1 style={{textAlign: "center"}}>All Caught Up!</h1>}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card__header">
                                <div className="card__header-title text-light">Recent <strong>Applications</strong>
                                </div>
                            </div>
                            <div className="card">
                                {this.displayRecentJobs().length > 0 ? this.displayRecentJobs() : <h1 style={{textAlign: "center"}}>No Applications!</h1>}
                            </div>
                        </div>
                    </div>
                </main>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        goals: state.goalsState.goals,
        jobs: state.jobsState.jobs
    }
}

export default connect(mapStateToProps)(Dashboard)