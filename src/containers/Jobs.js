import React from 'react'
import Job from '../components/Job'
import Modal from '../components/Modal'
import JobForm from '../components/JobForm'
import { connect } from 'react-redux'

import { createJob, deleteJob, updateJob } from '../actions/jobs'

class Jobs extends React.Component {

    state = {
        show: false
    }

    handleDeleteClick = id => {
        this.props.deleteJob(id)
    }

    handleEditClick = job => {
        this.props.updateJob(job)
    }

    toggleModal = e => {
        this.setState({
            show: !this.state.show
        })
    }

    handleNewSubmit = (job) => {
        this.props.createJob(job)
    }

    render(){
        let renderJobs = this.props.jobs.map(job => <Job key={job.id} job={job} handleOnDeleteClick={this.handleDeleteClick} handleOnEditClick={this.handleEditClick} />)
        
        return(
            <div>
                <button className="createJob" onClick={this.toggleModal}>Interested in a New Job?</button>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <JobForm toggleModal={this.toggleModal} onClose={this.toggleModal} handleOnSubmit={this.handleNewSubmit} />
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