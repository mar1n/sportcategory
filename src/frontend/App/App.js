import React from 'react'
import './App.css'
import {  Route, Switch, withRouter, Redirect } from 'react-router-dom'
import SportCategory from '../SportCategory/SportCategory'
import Details from '../Details/Details'
import NotFound from '../NotFound/NotFound'
import ReactGA from 'react-ga'
import Menu from '../Menu/Menu'
import ManageSports from '../ManageSports/ManageSports'
import Play from '../Details/Play'
import Admin from '../Admin/Admin'
import Login from '../Auth/Login'
import Logout from '../Auth/Logout'
import Banner from '../Banner/Banner'
import Loading from '../Loading/Loading'

class App extends React.Component {
  constructor(props) {
    super(props)
    ReactGA.initialize('UA-164230375-1')
    ReactGA.pageview(this.props.pathname + this.props.location.search + this.props.location.hash)
    this.props.history.listen((location) => {
      ReactGA.pageview(location.pathname + location.search + location.hash)
    })
    this.state = {
      showBanner: { show: false, banner: {} },
      loginInfo: null
    }
    //this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    fetch('/loggedIn').then(res => {
      return res.ok ? res.json() : Promise.reject();
    }).then(res => {
      if (res.result) {
        this.setState(() => ({
          loginInfo: {
            username: res.username,
            ...(res.isAdmin ? { isAdmin: true } : {})
          }
        }))
      } else {
        this.setState(() => ({ loginInfo: {} }))
      }
    })
  }

  logIn = (banner, loginInfo) => {
    this.setState(() => ({
      showBanner: {show: true, banner },
      loginInfo
    }));
  }

  logOut = (banner) => {
    fetch('/logout').then(res => {
      return res.ok ? res.json() : Promise.reject()
    }).then(res => {
      if(res.result) {
        this.setState(() => ({
          showBanner: { show: true, banner },
          loginInfo: { username: null }
        }))
      } else {
        this.setState(() => ({
          showBanner: {
            show: true,
            banner: { message: 'Error: Unable to Logout', isSuccess: false }
          }
        }))
      }
    })
  }

  hideBanner = delay => {
    setTimeout(() => 
    this.setState(() => ({
      showBanner: { show: false, banner: {} }
    })), delay)
  }

  render() {
    if(!this.state.loginInfo) {
      return <Loading />
    }
    let { showBanner, loginInfo } = this.state
    return (
      <div className='App'>
        <Menu loginInfo={loginInfo} />
        <Switch>
          <Route exact path='/' component={SportCategory} />
          <Route exact path='/NotFound' component={NotFound} />
          <Route exact path='/login' render={props =>
            <Login {...props} logIn={this.logIn} />} />
          <Route exact path='/logout' render={() =>
            <Logout logOut={this.logOut} />} />
          <Route path='/admin/sport' render={props =>
            <Admin {...props} loginInfo={loginInfo} />} />
          <Route path='/manage/sports' component={ManageSports} />
          <Route exact path='/:sportID/play' component={Play} />
          <Route exact path='/:sportId' component={Details} />
          
          <Route render={() => <Redirect to='/NotFound' />} />
        </Switch>
        {showBanner.show ? 
          <Banner banner={showBanner.banner} 
            hideBanner={this.hideBanner} /> :
          <></>}
      </div>
    )
  }
}

export default withRouter(App)