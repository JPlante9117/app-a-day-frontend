import React from 'react'
import '../goal.css'
import Moment from 'react-moment'
import moment from 'moment'

const Goal = props => {
    
    const { title, description, due_date, completed} = props.goal

    const headerColor = (goal) => {
        let TODAY = moment().startOf('day')
        if (goal.completed){
            return 'green'
        } else if (moment(goal.due_date).isBefore(TODAY, 'd')){
            return 'red'
        }
    }

    return(
        <div className="goalCard" >
            <div className="goalTitle" style={{backgroundColor: headerColor(props.goal) }}>{title}</div>
            <div className="goalContent">
                <div className="goalDescription">{description}</div>
                <div className="goalDuedate">
                    <div className="centered">
                        Due <Moment format="MMMM  D, YYYY">{due_date}</Moment>
                    </div>
                </div>
                <div className="goalButtonRow">
                    <button className="markComplete" onClick={() => props.handleOnCompleteClick(props.goal)}>{completed ? "Mark Incomplete" : "Mark Complete"}</button>
                    <button className="removeGoal" onClick={() => props.handleOnDeleteClick(props.goal.id)}>Remove Goal</button>
                    <button id={props.goal.id} className="updateGoal" onClick={() => props.handleOnUpdateClick(props.goal)}>Update Goal</button>
                </div>
            </div>
        </div>
    )
}

export default Goal