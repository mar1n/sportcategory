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
import Banner from '../Banner/Banner'

class App extends React.Component {
  constructor(props) {
    super(props)
    ReactGA.initialize('UA-164230375-1')
    ReactGA.pageview(this.props.pathname + this.props.location.search + this.props.location.hash)
    this.props.history.listen((location) => {
      ReactGA.pageview(location.pathname + location.search + location.hash)
    })
    this.state = {
      showBanner: { show: false, banner: {} }
    }
  }

  showLoginBanner = banner => {
    this.setState(() => ({
      showBanner: { show: true, banner }
    }))
  }

  hideLoginBanner = delay => {
    setTimeout(() => 
    this.setState(() => ({
      showBanner: { show: false, banner: {} }
    })), delay)
  }

  render() {
    let showBanner = this.state.showBanner
    return (
      <div className='App'>
        <Menu />
        <Switch>
          <Route exact path='/' component={SportCategory} />
          <Route exact path='/NotFound' component={NotFound} />
          <Route exact path='/login' render={() => 
            <Login showLoginBanner={this.showLoginBanner} />} />
          <Route path='/admin/sport' component={Admin} />
          <Route path='/manage/sports' component={ManageSports} />
          <Route exact path='/:sportID/play' component={Play} />
          <Route exact path='/:sportId' component={Details} />
          
          <Route render={() => <Redirect to='/NotFound' />} />
        </Switch>
        {showBanner.show ? 
          <Banner banner={showBanner.banner} 
            hideLoginBanner={this.hideLoginBanner} /> :
          <></>}
      </div>
    )
  }
}

export default withRouter(App)
