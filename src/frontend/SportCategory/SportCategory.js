import React from 'react'
import Sport from './Sport'
import { Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { sports } from '../REST/get'
class SportCategory extends React.Component {
  constructor() {
    super()
    this.state = {
      sports: []
    }
  }

  componentDidMount() {
    sports().then(sports => {
      console.log(sports)
      this.setState({ sports })
    })
  }

  render() {
    const { sports } = this.state;
    return (
      <>
        {
          sports
            ? sports[0]
              ? <div className='container'>
                {
                  sports.map((sport) => (
                    <Sport
                    key={sport.id}
                    sport={sport}
                    />
                  ))
                }
              </div>
              : <Loading />
            : <Redirect to='/NotFound' />
        }
      </>
    )
  }
}
export default SportCategory