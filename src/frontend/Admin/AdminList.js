import React from "react";
import { Link, Redirect } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./AdminList.css";
import { sports as getSport } from '../REST/get'
export default class AdminList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: [],
      sportsToDelete: "",
    };
  }

  async componentDidMount() {
    getSport({
      'KYK-Excludes': 'imageCover;imageBackground'
  }).then(sports => {
      this.setState({ sports });
  });
  }

  prepareDelete = (sportID) => {
    console.log("The id of the sport we want to delte is: " + sportID);
    this.setState(() => ({
      sportsToDelete: sportID,
    }));
  };

  deleteSport = () => {
    const { sportsToDelete } = this.state
    fetch(`/rest/admin/delete/${sportsToDelete}`, {
      method: 'delete'
    }).then(res => res.ok ?  res.json() : Promise.reject()
    ).then(res => {
      console.log(res)
      if(res.result) {
        const remainingSport = this.state.sports.filter(sport => {
          return sport.id !== sportsToDelete
        })
        this.setState(() => ({
          sports: remainingSport,
          sportsToDelete: undefined
        }))
        this.showSuccessBanner(res.message)
      } else {
        this.showFailBanner(res.message)
      }
    }).catch(err => {
      this.showFailBanner(err)
      console.log(err)
    })
  }

  showSuccessBanner = message => {
    this.props.showNewBanner({
      message,
      isSuccess: true
    })
  }

  showFailBanner = reason => {
    this.props.showNewBanner({
      message: `Faild to delete Sport ${reason}`,
      isSuccess: false
    })
  }

  cancelDelete = () => {
    this.setState(() => ({
      sportsToDelete: undefined
    }))
  }

  render() {
    const { sports, sportsToDelete } = this.state;
    return sports ? (
      sports[0] ? (
        <AdminListPage
          sportsToDelete={sportsToDelete}
          prepareDelete={this.prepareDelete}
          deleteSport={this.deleteSport}
          cancelDelete={this.cancelDelete}
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

const AdminListPage = ({ 
  sportsToDelete,
  prepareDelete,
  deleteSport,
  cancelDelete,
   sports }) => {
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
        prepareDelete={prepareDelete}
        deleteSport={deleteSport}
        cancelDelete={cancelDelete}
        sports={sports}
      />
    </div>
  );
};

const Sports = ({ 
  sportsToDelete,
  prepareDelete,
   deleteSport,
   cancelDelete,
    sports }) => {
  return (
    <table className="SportList">
      <tbody>
        <tr>
          {Object.keys(sports[0]).reduce((acc, k) => {
            const key = k === 'thumbCover' ?
            'imageCover' :
            k === 'imageBackground' ?
                'thumbBackground' :
                k;
        return acc.concat(<th key={key}>{key}</th>)
          }, [])}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </tbody>
      {
        sports.map((sport) => {
          return sportsToDelete === sport.id ?
        <tbody key={sport.id} id='ToDelete'>{
          sportRow(
            prepareDelete,
            sport,
            true,
            cancelDelete,
            deleteSport
          )
        }</tbody> :
      <tbody key={sport.id}>{
        sportRow(prepareDelete, sport)
      }</tbody>
        })
      }
    </table>
  );
};

const sportRow = (
  prepareDelete,
  sport,
  confirmDelete,
  cancelDelete,
  deleteSport ) => {
  return (
    <tr key={sport.id}>
      {Object.entries(sport).map(kv => {
                let className = `Cell${kv[0].charAt(0).toUpperCase() + kv[0].slice(1)}`
                if (kv[0] === 'thumbCover' || kv[0] === 'thumbBackground') {
                    const {mimetype, data} = kv[1];
                    return <td className={className} key={kv[0]}>
                        <img src={
                            `data:${mimetype};base64,${data}`}
                            alt={`${sport.id} ${kv[0]}`} />
                    </td>
                }
                return <td className={className} key={kv[0]}>{kv[1]}</td>;
              })
      }
      <td>
        <img className='Edit icon'
          src={require(`../../images/editicon.svg`)}
          alt={'Edit icon'} />
      </td>
        {
          confirmDelete ?
          <td id='ConfirmDelete'>
              <div
                  className='DeleteItem'
                  id='title'
              >Please confirm:</div>
              <button
                  className='DeleteItem'
                  id='Cancel'
                  onClick={cancelDelete}
              >&#215; Cancel</button>
              <button
                  className='DeleteItem'
                  id='Delete'
                  onClick={deleteSport}
              >&#10004;  Delete</button>
          </td> :
            <td>
              <img onClick={() => prepareDelete(sport.id)}
                className='Delte icon'
                src={require(`../../images/deleteicon.svg`)}
                alt={'Delete icon'} />
            </td>
        }
    </tr>
  );
};
