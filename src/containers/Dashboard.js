import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GoalCalendar from '../components/BigCalendar'
import '../dashboard.scss'
import moment from 'moment'
import DashGoal from '../components/DashGoal'
import DashJob from '../components/DashJob'
import ScrollAnimation from 'react-animate-on-scroll'


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
        withinWeek.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        return withinWeek
    }

    displayUCGoals = () => {
        let upcomingGoals = this.upcomingGoals()
        if (upcomingGoals.length <= 3){
            return upcomingGoals.map(goal => <Link key={goal.id} to={"/goals"}><DashGoal key={goal.id}  goal={goal} /></Link> )
        } else {
            return upcomingGoals.slice(0, 3).map(goal => <Link key={goal.id} to={"/goals"}><DashGoal key={goal.id}  goal={goal} /></Link>)
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
        let recentJobs = this.props.jobs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 3)
        return recentJobs.map(job => <Link key={job.id} to={"/jobs"}><DashJob key={job.id}  job={job} /></Link>)
    }
    
    render() {
        return(
            <div className="grid" style={{paddingTop: "20px"}}>
                <main className="main">
                    <ScrollAnimation animateIn="fadeInDown" offset={0} animateOnce={true}>
                    <div className="main-overview">
                        <Link to={"/jobs"}><div className="overviewCard">
                            <div className="overviewCard-icon overviewCard-icon--apps">
                                <i className="far fa-file-alt">Apps</i>
                            </div>
                            <div className="overviewCard-description">
                                <h3 className="overviewCard-title text-light">Your Applications</h3>
                                <p className="overviewCard-subtitle">{this.props.jobs.length} jobs</p>
                            </div>
                        </div></Link>
                        <Link to={"/goals"}><div className="overviewCard">
                            <div className="overviewCard-icon overviewCard-icon--comingup">
                                <i className="far fa-calendar-check">Goals</i>
                            </div>
                            <div className="overviewCard-description">
                                <h3 className="overviewCard-title text-light">This Week's Goals</h3>
                                <p className="overviewCard-subtitle">{this.upcomingGoals().length > 0 ? this.upcomingGoals().length : "All Caught Up! Set a New Goal!"}</p>
                            </div>
                        </div></Link>
                        <Link to={"/goals"}><div className="overviewCard" style={{backgroundColor: this.pastDueGoals().length > 0 ? "salmon" : null}}>
                            <div className="overviewCard-icon overviewCard-icon--pastdue">
                                <i className="far fa-envelope">Due</i>
                            </div>
                            <div className="overviewCard-description">
                                <h3 className="overviewCard-title text-light" style={{color: this.pastDueGoals().length > 0 ? "white" : null}}>Past Due Goals</h3>
                                <p className="overviewCard-subtitle" style={{color: this.pastDueGoals().length > 0 ? "white" : null}}>{this.pastDueGoals().length > 0 ? this.pastDueGoals().length : "All Caught Up!"}</p>
                            </div>
                        </div></Link>
                    </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn" offset={0} delay={500}>
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
                    </ScrollAnimation>
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