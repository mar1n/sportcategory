import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AdminList from './AdminList'
import AdminAdd from './AdminAdd'
import AdminEdit from './AdminEdit'
import './Admin.css'

export default function Admin({ match, loginInfo, showNewBanner }) {
    return loginInfo.isAdmin ? (
        <div className='Admin'>
            <h1 className='Title'>Welcome back, {loginInfo.username}.</h1>
            <Switch>
                <Route
                    exact path={`${match.path}/list`}
                    render={() => 
                        <AdminList
                            showNewBanner={showNewBanner} />
                    } />
                <Route
                    exact path={`${match.path}/add`}
                    render={() => 
                        <AdminAdd
                            showNewBanner={showNewBanner} />}/>
                <Route
                    exact path={`${match.path}/edit/:sport`}
                    component={AdminEdit} />
                <Route render={() => <Redirect to='/NotFound' />} />
            </Switch>
        </div>
    ) :
    <Redirect to='/NotFound' />
}
