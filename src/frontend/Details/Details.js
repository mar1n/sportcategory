import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SportGet from '../SportCategory/SportGet';

import './Details.css';
export default class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            sport: {}
        };
    }

    componentDidMount() {
        let sportId = this.props.match.params.sportId;
        fetch('/rest/sport')
          .then(response => response.json())
          .then(characters =>  characters.find(sport => sport.id === sportId))
          .then(sport => this.setState({sport}))
    }
    render() {
        if (this.state.sport === undefined) {
            return <Redirect to='/NotFound' />
        } else if (this.state.sport.id) {
            return (
                <>
                    <div className='Details'>
                        <h1>{this.state.sport.title}</h1>
                        <div className='content'>
                            <div>{this.state.sport.details}</div>
                            <img
                                src={require(`../../images/${this.state.sport.id}.jpg`)}
                                alt={this.state.sport.title}
                            />
                        </div>
                        <Link to='/'>Back to Home Page</Link>
                    </div>
                </>
            );
        }
        return <div></div>
    }
}