import React, { Component } from 'react'

import eve_login from '../assets/img/eve_login.png'

class RiseLogin extends Component {
  render() {
    return(
      <div className="row push-40">
        <div className="text-center">
            <img src={eve_login} alt="EVE SSO Login"/>
        </div>
      </div>
    )
  }
}

export default RiseLogin