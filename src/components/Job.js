import React from 'react'
import '../jobs.css'
import Label from './Label'

const Job = props => {

    const { title, description, status, link, labels} = props.job

    return(
        <div className="jobCard" >
            <div className="jobContent">
                <div className="jobTitle">{title}</div>
                <div className="jobDescription">{description}</div>
                <div className="jobStatusContainer">    
                    <div className="jobStatus">
                        {status}
                    </div>
                </div>
                <div>
                    <a href={link}>Link To Application</a>
                </div>
                <div className="labelContainer">
                    {labels.map(label => <Label title={label.title} /> )}
                </div>
                <div className="jobButtonRowContainer">
                    <div className="jobButtonRow">
                        <button className="updateJob" onClick={() => props.handleOnEditClick(props.job)}>Update Job</button>
                        <button className="removeJob" onClick={() => props.handleOnDeleteClick(props.job.id)}>Remove Job</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job