import React from 'react';
import Sport from './Sport';
import { Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading';
class SportCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      sport: {}
    };
  }

  async componentDidMount() {
    try {
      let fetchData = await fetch('/rest/sport')
      let sport = await fetchData.json();
      this.setState({ sport });
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
        {
          this.state.sport
            ? this.state.sport[0]
            ? <div className='container'>
              {
                this.state.sport.map((sport) => (
                  <Sport key={sport.id} id={sport.id} title={sport.title} logo={sport.logo} />
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
export default SportCategory;