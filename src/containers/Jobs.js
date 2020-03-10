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
        form: '',
        filter: '',
        jobs: []
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
            form: '',
            filter: ''
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

    filterChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    filterJobs = (event, jobs) => {
        event.preventDefault()

        const included = (element) => {
            return element.title.indexOf(this.state.filter.toLowerCase()) > -1
        }
       let newJobs = jobs.filter(job => job.props.job.labels.some(included))
       this.setState(prevState => ({
           ...prevState,
           jobs: newJobs
       }))
    }

    render(){
        let renderJobs = this.props.jobs.map(job => <Job key={job.id} job={job} handleOnDeleteClick={this.handleDeleteClick} handleOnEditClick={this.handleEditClick} />)
        
        const jobDisplay = () => {
            if (this.state.filter) {
                if (this.state.jobs.length === 0){
                    return <h2>No Jobs With Those Tags</h2>
                } else {
                    return this.state.jobs
                }
            } else {
                return renderJobs
            }
        }

        return(
            <div className="container">
                <button className="createJob" onClick={this.toggleModal}>Interested in a New Job?</button>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <JobForm job={this.state.job} buttonLabel={this.state.form === 'edit' ? "Update Job" : "Create Job"} toggleModal={this.toggleModal} onClose={this.toggleModal} handleOnSubmit={this.handleSubmit}/>
                </Modal>
                <h2>JOBS</h2>
                <div className="filterContainer">
                    <form onChange={(event) => this.filterJobs(event, renderJobs)}>
                        <input type="text" onChange={this.filterChange} value={this.state.filter} name="filter" />
                        <input type="submit" value="Search" />
                    </form>
                </div>
                {jobDisplay()}
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