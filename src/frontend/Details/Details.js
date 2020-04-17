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
          .then(characters =>  characters.find(sport => sport.id === sportId)).then(sport => this.setState({sport}))
    }
    render() {
        // var images = require.context('../../images', true);
        // let img_src = images(`${this.state.sport.logo}.jpg`);
        if (this.state.sport === undefined) {
            return <Redirect to='/NotFound' />
        } else {
            return (
                <>
                    <div className='Details'>
                        <h1>{this.state.sport.title}</h1>
                        <div className='content'>
                            <div>{this.state.sport.details}</div>
                            <img
                                src={require(`./${this.state.sport.logo}.jpg`)}
                                alt={this.state.sport.title}
                            />
                        {console.log(this.state.sport.logo)}
                        </div>
                        <Link to='/'>Back to Home Page</Link>
                    </div>
                </>
            );
        }
    }
}