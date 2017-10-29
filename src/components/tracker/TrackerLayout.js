import React, { Component } from 'react'

import RiseLocation from '../RiseLocation'
import RiseNotification from '../RiseNotification'

class TrackerLayout extends Component {
  render() {
    return(
      <main>
        <RiseLocation />
        <RiseNotification />
      </main>
    )
  }
}

export default TrackerLayout