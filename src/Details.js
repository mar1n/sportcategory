import React from 'react';
import { Link } from 'react-router-dom';
import SportGet from './SportGet';

export default class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            sport: {}
        };
    }

    componentDidMount() {
        let sportId = this.props.match.params.sportId;
        let sport = SportGet().find( sport => sport.id === sportId);
        this.setState({
            sport
        });
    }
    render() {
        return(
            <>
                <h1>{this.state.sport.title}</h1>
                <Link to='/'>Back to Home Page</Link>
            </>
        );
    }
}