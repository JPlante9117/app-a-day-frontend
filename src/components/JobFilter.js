import React from 'react'

const JobFilter = props => {

    return(
    <div className="filterContainer">
        <form onChange={(event) => props.handleOnFormChange(event, props.jobs)}>
            <input type="text" onChange={props.handleOnFilterChange} value={props.filterInput} name="filter" placeholder="Search By Tag . . ." />
            <button className="resetButton" disabled={props.disabled()} onClick={props.handleOnResetClick}>Reset</button>
        </form>
    </div>
    )
}

export default JobFilter