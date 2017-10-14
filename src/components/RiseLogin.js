import React, { Component } from 'react'

import eve_login from '../assets/img/eve_login.png'

class RiseLogin extends Component {
  render() {
    return(
      <div className="row push-40">
        <div className="col-xs-4 col-xs-offset-4 text-center">
            <img src={eve_login} />
        </div>
      </div>
    )
  }
}

export default RiseLogin