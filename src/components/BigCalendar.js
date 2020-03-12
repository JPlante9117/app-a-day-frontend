import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'

const localizer = momentLocalizer(moment)

const GoalCalendar = props => {

    const setEvents = () => {
        const calendar = []
        props.goals.map(goal => {
            return calendar.push({
                start: new Date(goal.due_date),
                end: new Date(moment(goal.due_date)),
                allDay: true,
                title: `${goal.title}`
            })
        })
        props.jobs.map(job => {
            return calendar.push({
                start: new Date(job.updated_at),
                end: new Date(moment(job.updated_at)),
                allDay: true,
                title: `${job.title} | ${job.status}`
            })
        })
        return calendar
    }

    return(
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={setEvents()}
                startAccessor="start"
                endAccessor="end"
                style={{height: "75vh", width: "100%"}}
                views={['month']}
                />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        goals: state.goalsState.goals,
        jobs: state.jobsState.jobs
    }
}

export default connect(mapStateToProps)(GoalCalendar)