import React from 'react'
import Job from '../components/Job'
import Modal from '../components/Modal'
import JobForm from '../components/JobForm'

class Jobs extends React.Component {

    state = {
        jobs: [],
        show: false
    }

    toggleModal = e => {
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        let jobs = this.props.jobs.filter(job => job.completed === false)
        let completedJobs = this.props.jobs.filter(job => job.completed === true)
        let renderJobs = jobs.map(job => <Job id={job.id} key={job.id} title={job.title} description={job.description} status={job.status} link={job.link} />)
        let renderCompletedJobs = completedJobs.map(job => <Job id={job.id} key={job.id} title={job.title} description={job.description} status={job.status} link={job.link} />)

        
        return(
            <div>
                <button className="createJob" onClick={this.toggleModal}>Interested in a New Job?</button>
                <Modal onClose={this.toggleModal} show={this.state.show} >
                    <JobForm toggleModal={this.toggleModal} onClose={this.toggleModal} />
                </Modal>
                <h2>JOBS</h2>
                {renderJobs}
                <hr />
                {renderCompletedJobs}
                
            </div>
        )
    }
}

export default Jobs