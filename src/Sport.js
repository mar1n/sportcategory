import React from 'react';
import { Link } from 'react-router-dom';

function Sport(props) {
    return (
      <Link to='/details' className='sport'>
        <img src={props.logo} alt={`${props.title} logo`} />
        <div className='overlay'>
          <h1>{props.title}</h1>
        </div>
      </Link>
    )
  };

export default Sport;