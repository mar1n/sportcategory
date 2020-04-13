import React from 'react';
import Sport from './Sport';
import Football from './images/football.jpg';
import Basketball from './images/basketball.jpg';
import Icehockey from './images/icehockey.jpg';
import Tennis from './images/tennis.jpg';
import Rugby from './images/rugby.jpg';
import Vollyball from './images/vollyball.jpg';

function SportCategory() {
  return (
    <>
      {
        getSport().map((sport) => (
          <Sport key={sport.id} id={sport.id} title={sport.title} logo={sport.logo} />
        ))
      }
    </>
  )
}
export default SportCategory;