import React from 'react'

const toTitleCase = string => {
    let tag = string.split(" ")
    for(let i = 0; i < tag.length; i++){
        tag[i] = tag[i][0].toUpperCase() + tag[i].slice(1)
    }

    return tag.join(" ")
}

const Label = props => {
    return(
        <div className="labelTag">
            {toTitleCase(props.title)}
        </div>
    )
}

export default Label