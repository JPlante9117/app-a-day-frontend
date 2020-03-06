import React from 'react'
import { connect } from 'react-redux'

class Job extends React.Component {
    state = {
        title: this.props.title,
        description: this.props.description,
        status: this.props.status,
        link: this.props.link
    }

    render(){
        return(
            <div>
                Title: {this.state.title}<br/>
                Description: {this.state.description}<br/>
                status: {this.state.status}<br/>
                <a href={this.props.link}>Link to Job Post</a>
            </div>
        )
    }
}

export default connect()(Job)