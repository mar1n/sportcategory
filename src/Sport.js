import React from 'react';

function Sport(props) {
    return (
      <div className='sport'>
        <img src={props.logo} alt={`${props.title} logo`} />
        <div className='overlay'>
          <h1>{props.title}</h1>
        </div>
      </div>
    )
  };

export default Sport;