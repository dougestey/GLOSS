import React, { Component } from 'react';

class RiseHeader extends Component {
  render() {
    return(
      <header id="page-header" className="push-50">
        <div className="h3 text-right pull-right">
          <div className="text-success pull-right">ONLINE</div>
        </div>
        <h1 className="h3 font-w200">
          <a className="link-sf font-w300" href="index.html">RISE <small>v0.1</small></a>
        </h1>
      </header>
    )
  }
}

export default RiseHeader;