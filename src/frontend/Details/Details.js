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
            let fetchData = await fetch(`/rest/sport/${sportId}`)
            let sport = await fetchData.json();
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
                            <DetailsPage sports={this.state.sport} />
                            : <Loading />
                }
            </>
        )
    }
}

const DetailsPage = ({ sports }) => {
    return (
        <>
            <div className='Details'>
                <h1>{sports.title}</h1>
                <div className='content'>
                    <div>{sports.details}</div>
                    <img
                        src={require(`../../images/${sports.id}.jpg`)}
                        alt={sports.title}
                    />
                </div>
                <Link to={`${sports.id}/play`}><h2>Click to watch rules of the Game.</h2></Link>
                <Link to='/'>Back to Home Page</Link>
            </div>
        </>
    )
}