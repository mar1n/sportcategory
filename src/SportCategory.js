import React from 'react';
import Sport from './Sport';
import SportGet from './SportGet'
function SportCategory() {
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
export default SportCategory;