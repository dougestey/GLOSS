import React, { Component } from 'react'
import Velocity from 'velocity-animate'

const messageMain = 'Praetor Altaris'
const messageSub = 'Welcome to Rise'

class RiseNotification extends Component {

  render() {
    return(
      <div ref="block" className="text-center">
        <h1 className="text-uppercase push-5">{messageMain}</h1>
        <h3 className="text-uppercase">{messageSub}</h3>
      </div>
    )
  }

  componentDidMount() {
    Velocity(this.refs.block, { opacity: 0 }, 2000)
  }
}

export default RiseNotification