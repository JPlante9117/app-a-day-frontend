import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { Redirect } from 'react-router-dom'
import logo from '../assets/app-a-daylogo.png'

export default class Home extends React.Component {

    state = {
        redirect: false
    }

    componentDidMount = () => {
        this.id = setTimeout(() => this.setState({redirect: true}), 5000)
        
    }

    componentWillUnmount = () => {
        clearTimeout(this.id)
    }

    render(){
        return(
            <div className={`homePage`}>
                <ScrollAnimation animateIn="fadeInDown" duration={3} offset={0}>
                
                    <img src={logo} />
                
                </ScrollAnimation>
                {this.state.redirect ? <Redirect to="/dashboard" /> : null}
            </div>
        )
    }
}