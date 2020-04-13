import Football from './images/football.jpg';
import Basketball from './images/basketball.jpg';
import Icehockey from './images/icehockey.jpg';
import Tennis from './images/tennis.jpg';
import Rugby from './images/rugby.jpg';
import Vollyball from './images/vollyball.jpg';

export default function SportGet() {
    return [
      { id: 'football', title: 'Football', logo: Football },
      { id: 'basketball', title: 'Basketball', logo: Basketball },
      { id: 'icehokey', title: 'Icehokey', logo: Icehockey },
      { id: 'tennis', title: 'Tennis', logo: Tennis },
      { id: 'rugby', title: 'Rugby', logo: Rugby },
      { id: 'Vollyball', title: 'Vollyball', logo: Vollyball }
    ];
  }