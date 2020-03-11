import React from 'react'
import '../jobs.css'
import Label from './Label'

const Job = props => {

    const { id, title, description, status, link, labels} = props.job

    return(
        <div className="jobCard" >
            <div className="jobTitle">{title}</div>
            <div className="jobContent">
                <div className="jobDescription">{description}</div>
                <div className="jobStatusContainer">    
                    <div className="jobStatus">
                        {status}
                    </div>
                </div>
                <div className="linkContainer">
                    <a href={link}>Link To Application</a>
                </div>
                <div className="labelContainer">
                    {labels.map(label => <Label key={label.id} title={label.title} /> )}
                </div>
                <div className="jobButtonRowContainer">
                        <button id={id} className="updateJob" onClick={() => props.handleOnEditClick(props.job)}>Update Job</button>
                        <button className="removeJob" onClick={() => props.handleOnDeleteClick(id)}>Remove Job</button>
                </div>
            </div>
        </div>
    )
}

export default Job