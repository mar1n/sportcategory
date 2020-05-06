import React from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./AdminList.css";

export default class AdminList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
      sportsToDelete: "",
    };
  }

  async componentDidMount() {
    try {
      let fetchData = await fetch("/rest/sport");
      let sports = await fetchData.json();
      this.setState({ sports });
    } catch (error) {
      console.log(error);
    }
  }

  deleteSport = (sportID) => {
    console.log("The id of the sport we want to delte is: " + sportID);
    this.setState(() => ({
      sportsToDelete: sportID,
    }));
  };

  render() {
    const { sports, sportsToDelete } = this.state;
    return sports ? (
      sports[0] ? (
        <AdminListPage
          sportsToDelete={sportsToDelete}
          deleteSport={this.deleteSport}
          sports={sports}
        />
      ) : (
        <Loading />
      )
    ) : (
      <Redirect to="NotFound" />
    );
  }
}

const AdminListPage = ({ sportsToDelete, deleteSport, sports }) => {
  return (
    <div className="AdminList">
      <div className="Header">
        <h4>Sports Database:</h4>
        <Link className="AddSport" to="./add">
          <div>Add Sport</div>
          <img
            className="icon"
            src={require(`../../images/addicon.svg`)}
            alt={"Add icon"}
          />
        </Link>
      </div>
      <Sports
        sportsToDelete={sportsToDelete}
        deleteSport={deleteSport}
        sports={sports}
      />
    </div>
  );
};

const Sports = ({ sportsToDelete, deleteSport, sports }) => {
  return (
    <table className="SportList">
      <thead>
        <tr>
          {Object.keys(sports[0]).reduce((acc, k) => {
            if (k === "imageCover" || k === "imageBackground") {
              return acc;
            }

            return acc.concat(<th key={k}>{k}</th>);
          }, [])}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {sports.map((sport) => {
          return sportsToDelete === sport.id ? (
            <tbody id="ToDelete">To Delete{sportRow(deleteSport, sport)}</tbody>
          ) : (
            sportRow(deleteSport, sport)
          );
        })}
      </tbody>
    </table>
  );
};

const sportRow = (deleteSport, sport) => {
  return (
    <tr key={sport.id}>
      {Object.entries(sport).reduce((acc, kv) => {
        if (kv[0] === "imageCover" || kv[0] === "imageBackground") {
          return acc;
        }

        return acc.concat(<td key={kv[0]}>{kv[1]}</td>);
      }, [])}
      <td>
        <img
          className="Edit icon"
          src={require(`../../images/editicon.svg`)}
          alt={"Edit icon"}
        />
      </td>
      <td>
        <img
          onClick={() => deleteSport(sport.id)}
          className="Delete icon"
          src={require(`../../images/deleteicon.svg`)}
          alt={"Delete icon"}
        />
      </td>
    </tr>
  );
};
