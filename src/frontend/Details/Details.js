import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading'
import PlayButton from './PlayButton'
import { sport } from '../REST/get'
import './Details.css'

export default class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sport: {}
        };
    }

    componentDidMount() {
        sport(this.props.match.params.sportId, {
            'KYK-Excludes': 'imageCover'
        }).then(sport => {
            this.setState({ sport })
        }).catch(() => {
            this.setState({ sport: undefined})
        })
    }
    render() {
        const { sport } = this.state
        return (
            <>
                {
                    sport ?
                        sport.title ?
                            <DetailsPage sport={sport} /> :
                            <Loading /> :
                        <Redirect to='/NotFound' />
                }
            </>
        )
    }
}

const DetailsPage = ({ sport }) => {
    return (
        <>
            <div className='Details'
                style={ {
                    backgroundImage: sport.imageBackground ?
                        `url("data:${sport.imageBackground.mimetype};base64,${sport.imageBackground.data}")` :
                        `url(${require(`../../images/background/default.jpg`)})`
                
                }}>
                <h1>{sport.title}</h1>
                <div className='content'>
                    <div>{sport.details}</div>
                </div>
                <h4>Watch the Rules</h4>
                <Link to={`${sport.id}/play`}>
                    <PlayButton />
                </Link>
                <Link to='/'>Back to Home Page</Link>
            </div>
        </>
    )
}