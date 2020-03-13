import React from 'react'
import Job from '../components/Job'
import Modal from '../components/Modal'
import JobForm from '../components/JobForm'
import { connect } from 'react-redux'

import { createJob, deleteJob, updateJob } from '../actions/jobs'
import ScrollAnimation from 'react-animate-on-scroll'

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
        show: this.props.showModal,
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

    filterSubmit = e => {
        e.preventDefault()
    }

    resetFilterClick = e => {
        e.preventDefault()
        this.setState(prevState => ({
            ...prevState,
            filter: ''
        }))
    }

    resetFilterDisabled = () => {
        if (this.state.filter){
            return ''
        } else {
            return "disabled"
        }
    }

    render(){
        let renderJobs = this.props.jobs.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).map(job => <Job key={job.id} job={job} handleOnDeleteClick={this.handleDeleteClick} handleOnEditClick={this.handleEditClick} />)
        
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
                <ScrollAnimation animateIn="fadeInDown" animateOnce={true} offset={0}>
                <button className="createJob" onClick={this.toggleModal}>Interested in a New Job?</button>
                </ScrollAnimation>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <JobForm job={this.state.job} buttonLabel={this.state.form === 'edit' ? "Update Job" : "Create Job"} toggleModal={this.toggleModal} onClose={this.toggleModal} handleOnSubmit={this.handleSubmit}/>
                </Modal>
                <ScrollAnimation animateIn="fadeIn" animateOnce={true} delay={250}>
                <h2>JOBS</h2>

                <div className="filterContainer" onSubmit={this.filterSubmit}>
                    <form onChange={(event) => this.filterJobs(event, renderJobs)}>
                        <input type="text" onChange={this.filterChange} value={this.state.filter} name="filter" placeholder="Search By Tag . . ." />
                        <button className="resetButton" disabled={this.resetFilterDisabled()} onClick={this.resetFilterClick}>Reset</button>
                    </form>
                </div>
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" delay={500} animateOnce={true}>
                {jobDisplay()}
                </ScrollAnimation>
                <ScrollAnimation animateIn="fadeIn" offset={0}>
                    {renderJobs.length === 0 ? <h1>No Applications</h1> : ""}
                </ScrollAnimation>
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