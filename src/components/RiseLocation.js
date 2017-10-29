import React, { Component } from 'react'

class RiseLocation extends Component {
  render() {
    return(
      <div className="rise-location row">
        <div className="rise-dial rise-dial-small col-xs-3 text-center">
          <div className="rise-circle-grooved rise-circle-grooved-small"></div>
          <h4>Stain</h4>
          <h1>TG-Z23</h1>
          <h4>0 / 0</h4>
        </div>
        <div className="rise-dial col-xs-6 text-center">
          <div className="rise-circle-dashed"></div>
          <div className="rise-circle-grooved"></div>
          <h4 className="mb0">Stain</h4>
          <h1>IP-MVJ</h1>
          <h4 className="mb0">0 / 0</h4>
        </div>
        <div className="rise-dial rise-dial-small col-xs-3 text-center">
          <div className="rise-circle-grooved rise-circle-grooved-small"></div>
          <h4>Stain</h4>
          <h1>TG-Z23</h1>
          <h4>0 / 0</h4>
        </div>
      </div>
    )
  }
}

export default RiseLocation