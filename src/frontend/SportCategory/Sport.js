import React from 'react'
import { Link } from 'react-router-dom'

function Sport({sport}) {
  console.log(sport.imageCover)
  return (
    <Link to={`/${sport.id}`} className='sport'>
      <img src={
        sport.imageCover ?
          `data:${sport.imageCover.mimetype};base64,${sport.imageCover.data}` :
            require(`../../images/list/default.jpg`)
      } alt={`${sport.title} logo`} />
      <div className='overlay'>
        <h1>{sport.title}</h1>
      </div>
    </Link>
  )
}

export default Sport