import React, { Component } from 'react';
// import { VelocityComponent } from 'velocity-react';

import './App.css';

import RiseHeader from './components/RiseHeader';
// import RiseLogin from './components/RiseLogin';
import RiseLocation from './components/RiseLocation';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSubComponent: false
    }
  }

  render() {   
    return (
      <div>
        <RiseHeader/>

        <main>
          <RiseLocation />
        </main>
      </div>
    );
  }

  componentDidUpdate() {
  }
}

export default App;
