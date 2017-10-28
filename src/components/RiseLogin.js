import React, { Component } from 'react'

import eve_login from '../assets/img/eve_login.png'

class RiseLogin extends Component {
  render() {
    return(
      <div className="row push-40">
        <div className="text-center">
          <a className="rise-button" href="http://arbiter/auth/authorize">Authorize</a>
        </div>
      </div>
    )
  }
}

export default RiseLogin