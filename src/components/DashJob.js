import React from 'react'
import Moment from 'react-moment'

import '../dashItems.scss'

const DashJob = ({job}) => {
    return(
        <div className="dashCardContainer">
            <div className="dashCard">
                <div className="dashCard-description">
                    <h3 className="dashCard-title text-light">{job.title}</h3>
                    <p className="dashCard-subtitle"><strong>Last Updated <Moment format="MMMM  D">{job.updated_at}</Moment></strong></p>
                </div>
                <p className="dashCard-subtitle" style={{marginLeft: "30px"}}>Current Status: <strong>{job.status}</strong></p>
            </div>
        </div>
    )
}

export default DashJob