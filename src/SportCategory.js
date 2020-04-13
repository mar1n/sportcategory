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
        <Sport id='football' title='Football' logo={Football} />
        <Sport id='basketball' title='Basketball' logo={Basketball} />
        <Sport id='icehockey' title='Icehockey' logo={Icehockey} />
        <Sport id='tennis' title='Tennis' logo={Tennis} />
        <Sport id='rugby' title='Rugby' logo={Rugby} />
        <Sport id='vollyball' title='Vollyball' logo={Vollyball} />
      </>
    )
}
export default SportCategory;