import React, { Component } from 'react'

class RiseHeader extends Component {
  render() {
    return(
      <header className="push-20 clearfix">
        <div className="text-right pull-right">
          <h3 className="text-success pull-right">ONLINE</h3>
        </div>
        <div className="text-left pull-left">
          <h3 className="font-w200">
            <a className="rise-link" href="index.html">RISE <small>v0.1</small></a>
          </h3>
        </div>
      </header>
    )
  }
}

export default RiseHeader