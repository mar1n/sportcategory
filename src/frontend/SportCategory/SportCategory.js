import React from 'react';
import Sport from './Sport';
import SportGet from './SportGet'
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
          let dataSport = await fetchData.json();
          console.log(dataSport);
          this.setState({ dataSport });
      } catch (error) {
          console.log(error)
      }
    }

    render() {
      return (
        <>
          <div className='container'>
            {
              SportGet().map((sport) => (
                <Sport key={sport.id} id={sport.id} title={sport.title} logo={sport.logo} />
              ))
            }
          </div>
        </>
      )
    }
}
export default SportCategory;