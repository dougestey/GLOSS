import React, { Component } from 'react'

class RiseLocation extends Component {
  render() {
    return(
      <div className="rise-location row">
        <div className="rise-dial col-xs-4 text-center">
          <div className="rise-circle-grooved rise-circle-grooved-small"></div>
          <h4>TG-Z23</h4>
          <h6>Stain</h6>
        </div>
        <div className="rise-dial col-xs-4 text-center">
          <div className="rise-circle-dashed"></div>
          <div className="rise-circle-grooved"></div>
          <h2>IP-MVJ</h2>
          <h5>Stain</h5>
        </div>
        <div className="rise-dial col-xs-4 text-center">
          <div className="rise-circle-grooved rise-circle-grooved-small"></div>
          <h4>TG-Z23</h4>
          <h6>Stain</h6>
        </div>
      </div>
    )
  }
}

export default RiseLocation