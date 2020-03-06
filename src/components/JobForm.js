import React from 'react'
import { connect } from 'react-redux'

import { createJob } from '../actions/jobs'

class JobForm extends React.Component {
    state = {
        title: "",
        description: "",
        status: "",
        link: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log("submitting . . .")
        this.props.createJob(this.state)
        this.setState({
            title: "",
            description: "",
            status: "Interested",
            link: ""
        })
        this.props.toggleModal()
    }

    render() {
        return(
            <div>
                <h2>New Job Form</h2>
                <form onSubmit={this.handleSubmit} >
                    <h3>Job Title</h3>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="What's the Job Title" maxLength="20"/>
                    <h3>Brief Description</h3>
                    <textarea rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange} maxLength="80" placeholder="Supply a brief description (max 80 characters)" />
                    <h3>How Far Along Are You?</h3>
                    <select name="status" value={this.state.status}>
                        <option value="Interested">Interested</option>
                        <option value="Applying">Applying</option>
                        <option value="Applied">Applied</option>
                        <option value="Offered">Job Offered</option>
                        <option value="Declined">Declined</option>
                        <option value="Hired">Hired</option>
                    </select>
                    
                    <br/><br/>
                    <input type="submit" value="Create Job" /> <button className="cancelButton" onClick={e => this.props.onClose(e)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { createJob })(JobForm)