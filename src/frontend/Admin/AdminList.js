import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './AdminList.css'

export default class AdminList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sports: []
        }
    }

    async componentDidMount() {
        try {
          let fetchData = await fetch('/rest/sport')
          let sports = await fetchData.json();
          this.setState({ sports })
        } catch (error) {
          console.log(error)
        }
    }

    render() {
        const { sports } = this.state
        return sports 
                ? sports[0]
                    ? <AdminListPage sports={sports} />
                     : <Loading />
                        :<Redirect to='NotFound' />
    }
}

const AdminListPage = ({ sports }) =>{
    return <div className='AdminList'>
            <div className='Header'>
                <h4>Sports Database:</h4>
                <Link className='AddSport' to='./add'>
                    <div>Add Sport</div>
                    <img className='icon'
                        src={require(`../../images/addicon.svg`)}
                        alt={'Add icon'} />
                </Link>
            </div>
            <Sports sports={sports} />
            </div>
}

const Sports = ({ sports }) => {
    return (
        <table className='SportList'>
            <thead>
            <tr>{
                    Object.keys(sports[0]).reduce((acc, k) => {
                        if(k === 'imageCover' || k === 'imageBackground') {
                            return acc
                        }

                        return acc.concat(<th key={k}>{k}</th>)
                    }, [])
                }
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {
            sports.map((sport, i) => {
                return (<tr key={i}>
                    {
                        Object.entries(sport).reduce((acc, kv) => {
                            if(kv[0] === 'imageCover' || kv[0] === 'imageBackground') {
                                return acc
                            }
                            return acc.concat(<td key={kv[0]}>{kv[1]}</td>)
                        }, [])
                    }
                    <td>
                        <img className='Edit icon'
                            src={require(`../../images/editicon.svg`)}
                            alt={'Edit icon'} />
                    </td>
                    <td>
                        <img className='Delete icon'
                            src={require(`../../images/deleteicon.svg`)}
                            alt={'Delete icon'} />
                    </td>
                </tr>);
            })
        }
    </tbody>
    </table>)
}