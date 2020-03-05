import React from 'react'
import Goal from '../components/Goal'

const Goals = props => {
    const renderGoals = props.goals.map(goal => <Goal id={goal.id} key={goal.id} title={goal.title} description={goal.description} complete={goal.completed} due_date={goal.due_date} />)
    return(
        <div>
            <h2>GOALS</h2>
                {renderGoals}
        </div>
    )
}

export default Goals