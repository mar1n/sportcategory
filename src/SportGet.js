import Football from './images/football.jpg';
import Basketball from './images/basketball.jpg';
import Icehockey from './images/icehockey.jpg';
import Tennis from './images/tennis.jpg';
import Rugby from './images/rugby.jpg';
import Vollyball from './images/vollyball.jpg';

export default function SportGet() {
    return [
      { id: 'football', title: 'Football', logo: Football, details: 'Association football, more commonly known as football or soccer,[a] is a team sport played with a spherical ball between two teams of 11 players. It is played by approximately 250 million players in over 200 countries and dependencies, making it the world\'s most popular sport. The game is played on a rectangular field called a pitch with a goal at each end. The object of the game is to score by moving the ball beyond the goal line into the opposing goal.' },
      { id: 'basketball', title: 'Basketball', logo: Basketball, details: 'Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball (approximately 9.4 inches (24 cm) in diameter) through the defender\'s hoop (a basket 18 inches (46 cm) in diameter mounted 10 feet (3.048 m) high to a backboard at each end of the court) while preventing the opposing team from shooting through their own hoop. A field goal is worth two points, unless made from behind the three-point line, when it is worth three. After a foul, timed play stops and the player fouled or designated to shoot a technical foul is given one or more one-point free throws. The team with the most points at the end of the game wins, but if regulation play expires with the score tied, an additional period of play (overtime) is mandated.' },
      { id: 'icehokey', title: 'Icehokey', logo: Icehockey, details: 'Ice hockey is a contact team sport played on ice, usually in a rink, in which two teams of skaters use their sticks to shoot a vulcanized rubber puck into their opponent\'s net to score goals. The sport is known to be fast-paced and physical, with teams usually fielding six players at a time: one goaltender, and five players who skate the span of the ice trying to control the puck and score goals against the opposing team.' },
      { id: 'tennis', title: 'Tennis', logo: Tennis, details: 'Tennis is a racket sport that can be played individually against a single opponent (singles) or between two teams of two players each (doubles). Each player uses a tennis racket that is strung with cord to strike a hollow rubber ball covered with felt over or around a net and into the opponent\'s court. The object of the game is to maneuver the ball in such a way that the opponent is not able to play a valid return. The player who is unable to return the ball will not gain a point, while the opposite player will.' },
      { id: 'rugby', title: 'Rugby', logo: Rugby, details: 'Rugby union, widely known simply as rugby, is a full contact team sport that originated in England in the first half of the 19th century. One of the two codes of rugby football, it is based on running with the ball in hand. In its most common form, a game is played between two teams of 15 players using an oval-shaped ball on a rectangular field called a pitch. The field has H-shaped goalposts at both ends.' },
      { id: 'Vollyball', title: 'Vollyball', logo: Vollyball, details: 'Volleyball is a team sport in which two teams of six players are separated by a net. Each team tries to score points by grounding a ball on the other team\'s court under organized rules.[1] It has been a part of the official program of the Summer Olympic Games since Tokyo 1964.' }
    ];
  }