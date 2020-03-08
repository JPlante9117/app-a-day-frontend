import React from 'react'
import { WithContext as ReactTags} from 'react-tag-input'

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class JobForm extends React.Component {
    state = {
        title: "",
        description: "",
        status: "",
        link: "",
        labels_attributes: []
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDelete = (i) => {
        const { labels_attributes } = this.state;
        this.setState({
         labels_attributes: labels_attributes.filter((label, index) => index !== i),
        });
    }
 
    handleAddition = (label) => {
        if (this.state.labels_attributes.length < 6){
            let lowerLabel = Object.assign({}, label, {title: label.title.toLowerCase()})
            this.setState(state => ({ labels_attributes: [...state.labels_attributes, lowerLabel] }));
        }
        if (this.state.labels_attributes.length === 6){
            this.setState(state => ({full: "(max)"}))
        }
    }

    handleSubmit = e => {

        e.preventDefault()
        this.props.handleOnSubmit(this.state)
        this.setState({
            title: "",
            description: "",
            status: "Interested",
            link: "",
            labels_attributes: []
        })
        this.props.toggleModal()
    }

    render() {
        const { labels_attributes } = this.state
        return(
            <div>
                <h2>New Job Form</h2>
                <form onSubmit={this.handleSubmit} >
                    <h3>Job Title</h3>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="What's the Job Title" required/>
                    <h3>Brief Description</h3>
                    <textarea rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange} maxLength="350" placeholder="Supply a brief description (max 350 characters)" required/>
                    <h3>Where in the Application Process Are You?</h3>
                    <select name="status" value={this.state.status} onChange={this.handleChange} required>
                        <option value=""> -- select an option -- </option>
                        <option value="Interested">Interested</option>
                        <option value="Applying">Applying</option>
                        <option value="Applied">Applied</option>
                        <option value="Offered">Job Offered</option>
                        <option value="Declined">Declined</option>
                        <option value="Hired">Hired</option>
                    </select>
                    <h3>Link to Job Post</h3>
                    <input type="text" name="link" value={this.state.link} onChange={this.handleChange} placeholder="example.com/Job" required/>
                    <h3>Tags (max 6)</h3>
                    <ReactTags tags={labels_attributes}
                        labelField={'title'}
                        name={'labels_attributes'}
                        inputFieldPosition="inline"
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        allowDragDrop={false}
                        delimiters={delimiters} />
                    <br/><br/>
                    <input type="submit" value="Create Job" /> <button className="cancelButton" onClick={e => this.props.onClose(e)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default JobForm