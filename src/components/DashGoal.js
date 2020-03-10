import React from 'react'
import Moment from 'react-moment'

import '../dashItems.scss'

const DashGoal = ({goal}) => {
    return(
        <div className="dashCardContainer">
            <div className="dashCard">
                <div className="dashCard-description">
                    <h3 className="dashCard-title text-light">{goal.title}</h3>
                    <p className="dashCard-subtitle"><strong>Due <Moment format="MMMM  D">{goal.due_date}</Moment></strong></p>
                </div>
                <p className="dashCard-subtitle" style={{marginLeft: "30px"}}>{goal.description}</p>
            </div>
        </div>
    )
}

export default DashGoal