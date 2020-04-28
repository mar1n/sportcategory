import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AdminList from './AdminList'
import AdminAdd from './AdminAdd'
import AdminEdit from './AdminEdit'
import './Admin.css'

export default function Admin({ match }) {
    return (
        <div className='Admin'>
            <h1 className='Title'>Welcome back, Admin.</h1>
            <Switch>
                <Route exact path={`${match.path}/list`} component={AdminList} />
                <Route exact path={`${match.path}/add`} component={AdminAdd} />
                <Route exact path={`${match.path}/edit`} component={AdminEdit} />
                <Route render={() => <Redirect to='/NotFound' />} />
            </Switch>
        </div>
    )
}