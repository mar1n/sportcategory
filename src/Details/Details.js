import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SportGet from '../SportGet';
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
        let sport = SportGet().find(sport => sport.id === sportId);
        this.setState({
            sport
        });
    }
    render() {
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
                                src={this.state.sport.logo}
                                alt={this.state.sport.title}
                            />
                        </div>
                        <Link to='/'>Back to Home Page</Link>
                    </div>
                </>
            );
        }
    }
}