import React, { useState } from 'react';
import Geogebra from '../../src';
import './style.css';

function App() {
  const [position, setPosition] = useState('Position A: (?,?)');

  function clickHandler() {
    const app = window.appId;
    app.evalCommand(`A=(${Math.random()},${Math.random()})`);
  }

  function positionA() {
    const app = window.appId;
    setPosition(`Position A: (${app.getXcoord('A')},${app.getYcoord('A')})`);
  }

  function registerGeogebraListeners() {
    const app = window.appId;
    app.registerUpdateListener(positionA);
    console.log('Geogebra Listeners registered');
  }

  return (
    <div className="App">
      <h1>Set Point 'A' and look what happens if you move it</h1>
      <Geogebra
        id="appId"
        appName="geometry"
        width="600"
        height="400"
        appletOnLoad={registerGeogebraListeners}
        enableCAS="false"
      />
      <button type="button" onClick={clickHandler}>
        Set 'A'
      </button>
      <p>{position}</p>
    </div>
  );
}
export default App;
