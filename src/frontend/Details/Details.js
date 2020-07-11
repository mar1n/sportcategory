import React from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../Loading/Loading";
import PlayButton from "./PlayButton";
import { sport } from "../REST/get";
import "./Details.css";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: {},
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.sportId);
    sport(this.props.match.params.sportId, {
      "KYK-Excludes": "imageCover;thumbCover;thumbBackground",
    })
      .then((sport) => {
        this.setState({ sport });
      })
      .catch(() => {
        this.setState({ sport: undefined });
      });
  }
  render() {
    const { sport } = this.state;
    console.log(sport);
    return (
      <>
        {sport ? (
          sport.title ? (
            <DetailsPage sport={sport} />
          ) : (
            <Loading />
          )
        ) : (
          <Redirect to="/NotFound" />
        )}
      </>
    );
  }
}

const DetailsPage = ({ sport }) => {
  return (
    <>
    <div className="parallax-container">
      <div
        className="Details"
        style={{
          backgroundImage: sport.imageBackground
            ? `url("data:${sport.imageBackground.mimetype};base64,${sport.imageBackground.data}")`
            : `url(${require(`../../images/background/default.jpg`)})`,
        }}
      >
          <div className="content">
        <h1>{sport.title}</h1>
          <div>{sport.details}</div>
          <h4>Watch the Rules</h4>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
          <Link to={`${sport.id}/play`}>
            <PlayButton />
          </Link>
          <Link to="/">Back to Home Page</Link>
        </div>
          </div>
        
          </div>
    </>
  );
};
