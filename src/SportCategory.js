import React from 'react';
import Sport from './Sport';
import Football from './images/football.jpg';
import Basketball from './images/basketball.jpg';
import Icehockey from './images/icehockey.jpg';
import Tennis from './images/tennis.jpg';
import Rugby from './images/rugby.jpg';
import Vollyball from './images/vollyball.jpg';

function SportCategory() {
    return(
      <>
        <Sport title='Football' logo={Football} />
        <Sport title='Basketball' logo={Basketball} />
        <Sport title='Icehockey' logo={Icehockey} />
        <Sport title='Tennis' logo={Tennis} />
        <Sport title='Rugby' logo={Rugby} />
        <Sport title='Vollyball' logo={Vollyball} />
      </>
    )
}
export default SportCategory;