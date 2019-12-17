import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Service from './service/Auth_service'


/* CUSTOM UI COMPONENTS */
import Navbar from './components/ui/Navbar.js'

/* CUSTOM PAGE COMPONENTS */
import Index from './components/pages/Index'
import Profile from './components/pages/Profile'
import Portfolio from './components/pages/Portfolio'
import Market from './components/pages/Market'
import ValueDetail from './components/pages/ValueDetail'


/* CUSTOM AUTH COMPONENTS */
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this._service = new Service()
  }

  setTheUser = user => {
    console.log(user)
    this.setState({ loggedInUser: user })
    console.log("El método 'setTheUser' de App.js se ha invocado, pasando al estado 'loggedInUser:", this.state.loggedInUser)
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service.loggedin()
        .then(theLoggedInUserFromTheServer => this.setState({ loggedInUser: theLoggedInUserFromTheServer.data }))
        .catch(err => {
          this.setState({ loggedInUser: false })
          console.log({ err })
        })
    }
  }


  render() {
console.log(this.state.loggedInUser)
    this.fetchUser()

    return (
      <>
        <Navbar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser} />

        <Switch>
          <Route exact path="/" component={Index} />

          <Route path="/signup" render={match => <Signup setUser={this.setTheUser} {...match} />} />
          <Route path="/login" render={match => <Login setUser={this.setTheUser} {...match} />} />
          {/* <Route path="/profile" 
           render={match =>
            this.state.loggedInUser == null ? (
              <Redirect to="/" />
            ) : this.state.loggedInUser || {} ? (
              <Profile loggedInUser={this.state.loggedInUser} />
            ) : (
              <Redirect to="/" />
            )
          }
          /> */}
          <Route path="/profile" render={() =>
            this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />
          } />
          <Route path="/portfolio" render={() =>
            this.state.loggedInUser ? <Portfolio loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}/> : <Redirect to="/" />
          } />
          <Route path="/market" render={() =>
            this.state.loggedInUser ? <Market loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />
          } />
          <Route path="/details" render={() =>
            this.state.loggedInUser ? <ValueDetail loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />
          } />
        </Switch>

      </>

    )
  }
}

export default App;