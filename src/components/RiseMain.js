import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthLayout from './auth/AuthLayout'
import TrackerLayout from './tracker/TrackerLayout'


class RiseMain extends Component {
  render() {
    return(
      <main>
        <Switch>
          <Route exact path='/' component={AuthLayout}/>
          <Route path='/tracker' component={TrackerLayout}/>
        </Switch>
      </main>
    )
  }
}

export default RiseMain