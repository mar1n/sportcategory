import React from 'react'
import Loading from '../Loading/Loading'
import { Redirect } from 'react-router-dom'

class Play extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sport: {}
        }
    }

    async componentDidMount() {
        let sportId = this.props.match.params.sportID
        try {
            let fetchData = await fetch(`/rest/sport/${sportId}`)
            let sport = await fetchData.json();
            this.setState({ sport })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return this.state.sport ?
                this.state.sport.title ?
                    <PlayPage sport={this.state.sport} /> :
                    <Loading/> :
                <Redirect to='/not-found' />;
    }
}

const PlayPage = ({ sport }) => {
    return(<iframe
            title={sport.title}
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/oPtXLmHOKEw?autoplay=1&mute=1`}
            />
        )
}

export default Play