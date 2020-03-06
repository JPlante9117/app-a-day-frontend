import React from 'react'
import '../goal.css'
import Moment from 'react-moment'

//PRESENTATIONAL COMPONENT

const Goal = props => {
    
    const { title, description, due_date, completed} = props.goal

    return(
        <div className="goalCard" >
            <div className="goalContent">
                <div className="goalTitle">{title}</div>
                <div className="goalDescription">{description}</div>
                <div className="">Due <Moment format="MMMM  D, YYYY">{due_date}</Moment> </div>
                Completed: {completed ? "Yes" : "No"}<br/>
                <div className="goalButtonRow">
                    <button className="markComplete" onClick={() => props.handleOnCompleteClick(props.goal)}>{completed ? "Undo Complete" : "Mark Complete"}</button>
                    <button className="removeGoal" onClick={() => props.handleOnDeleteClick(props.goal.id)}>Remove Goal</button>
                </div>
            </div>
        </div>
    )
}

export default Goal