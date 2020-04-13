import React from 'react';
import { Link } from 'react-router-dom';


export default class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            welcomeMessage: 'Welcome to the details page, WIP!!!'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: 'The best is yet to come'
            })
        }, 3000);
    }
    render() {
        return(
            <>
                <h1>{this.state.welcomeMessage}</h1>
                <Link to='/'>Back to Home Page</Link>
            </>
        );
    }
}