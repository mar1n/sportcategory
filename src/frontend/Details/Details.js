import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Details.css'

export default class Details extends React.Component {
    constructor() {
        super()
        this.state = {
            sport: {}
        };
    }

    async componentDidMount() {
        let sportId = this.props.match.params.sportId
        try {
            let fetchData = await fetch('/rest/sport')
            let data = await fetchData.json();
            let sport = data.find(sport => sport.id === sportId)
            this.setState({ sport })
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <>
                {
                    this.state.sport === undefined
                        ? <Redirect to='/NotFound' />
                        : this.state.sport.id
                            ?
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
                            : <Loading />
                }
            </>
        )
    }
}