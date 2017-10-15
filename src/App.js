import React, { Component } from 'react'
// import { VelocityComponent } from 'velocity-react'

import './App.css'

import RiseHeader from './components/RiseHeader'
import RiseLogin from './components/RiseLogin'
import RiseLocation from './components/RiseLocation'
import RiseNotification from './components/RiseNotification'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {   
    return (
      <div>
        <RiseHeader/>

        <main>
          {/* <RiseLogin /> */}
          <RiseLocation />

          <RiseNotification />
        </main>
      </div>
    )
  }

  componentDidUpdate() {
  }
}

export default App
