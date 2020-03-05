import React from 'react'

class Goal extends React.Component {

    state = {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        due_date: this.props.due_date,
        completed: this.props.complete
    }

    componentDidMount() {
        
    }

    render(){
        let {id, title, description, due_date, complete, markComplete} = this.props
        return(
            <div>
                Title: {title}<br/>
                Descr: {description}<br/>
                Due: {due_date}<br/>
                Completed: {complete ? "Yes" : "No"}<br/>
                <button onClick={() => markComplete(this.state)}>{complete ? "Undo Complete" : "Mark Complete"}</button>
            </div>
        )
    }
}

export default Goal