import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

const ErrorNotFound = () => {
    return(
        <div className="errorPage">
            <ScrollAnimation animateIn="fadeIn" duration={2}>
                <h1>404</h1>
                <h2>Uh oh! Looks like this page doesn't exist.</h2>
            </ScrollAnimation>
        </div>
    )
}

export default ErrorNotFound