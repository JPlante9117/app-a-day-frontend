import React from 'react'
import Job from '../components/Job'
import Modal from '../components/Modal'
import JobForm from '../components/JobForm'
import { connect } from 'react-redux'

import { createJob, deleteJob, updateJob } from '../actions/jobs'

class Jobs extends React.Component {

    state = {
        job: {
            id: "",
            title: "",
            description: "",
            status: "",
            link: "",
            labels: []
        },
        show: false,
        form: ''
    }

    handleDeleteClick = id => {
        this.props.deleteJob(id)
    }

    handleEditClick = (job) => {
        this.setState({
            job: job,
            show: !this.state.show,
            form: 'edit'
        })
    }

    toggleModal = e => {
        this.setState({
            job: {
                id: "",
                title: "",
                description: "",
                status: "",
                link: "",
                labels: []
            },
            show: !this.state.show,
            form: ''
        })
    }

    handleSubmit = (event, job) => {
        event.preventDefault()
        if (this.state.form === 'edit') {
            this.props.updateJob(job)
        } else {
            this.props.createJob(job)
        }
        this.toggleModal()
    }

    render(){
        let renderJobs = this.props.jobs.map(job => <Job key={job.id} job={job} handleOnDeleteClick={this.handleDeleteClick} handleOnEditClick={this.handleEditClick} />)
        
        return(
            <div>
                <button className="createJob" onClick={this.toggleModal}>Interested in a New Job?</button>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <JobForm job={this.state.job} buttonLabel={this.state.form === 'edit' ? "Update Job" : "Create Job"} toggleModal={this.toggleModal} onClose={this.toggleModal} handleOnSubmit={this.handleSubmit}/>
                </Modal>
                <h2>JOBS</h2>
                {renderJobs}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.jobsState.jobs
    }
}

export default connect(mapStateToProps, { createJob, deleteJob, updateJob })(Jobs)