import React, { useState } from 'react';
import Geogebra from '../../src';
import './style.css';

function App() {
  const [position, setPosition] = useState('Position A: (?,?)');
  const [appLoaded, setAppLoaded] = useState(false);

  function clickHandler() {
    const app = window.appId;
    const min = -3;
    const max = 2;
    const x = Math.round(Math.random() * (max - min + 1) + min);
    const y = Math.round(Math.random() * (max - min + 1) + min);
    app.evalCommand(`A=(${x},${y})`);
    setPosition(`Position A: (${x},${y})`);
  }

  function clickDeleteHandler() {
    const app = window.appId;
    if (app.exists('A')) {
      app.deleteObject('A');
      setPosition(`Position A: (?,?)`);
    }
  }

  function positionA() {
    const app = window.appId;
    setPosition(`Position A: (${app.getXcoord('A')},${app.getYcoord('A')})`);
  }

  function registerGeogebraListeners() {
    const app = window.appId;
    app.registerUpdateListener(positionA);
    app.setPerspective('G');
    app.setGridVisible(true);
    console.log('Geogebra Listeners registered');
    setAppLoaded(true);
  }

  return (
    <div className="App">
      <div className="top-left">
        <a href="https://github.com/saunaaa/react-geogebra">
          <button className="mdc-button foo-button" title="back to github">
            <div className="mdc-button__ripple"></div>
            <span class="material-icons">chevron_left</span>
          </button>
        </a>
      </div>
      <h1>react-geogebra Demo</h1>
      set Point 'A' and look what happens if you move it
      <Geogebra
        id="appId"
        appName="graphing"
        width="600"
        height="400"
        appletOnLoad={registerGeogebraListeners}
      />
      <div className="button-row">
        <button
          className="mdc-button mdc-button--raised foo-button"
          onClick={clickHandler}
          disabled={!appLoaded}
        >
          <div className="mdc-button__ripple"></div>
          <span className="mdc-button__label">set 'A'</span>
        </button>
        <button
          className="mdc-button mdc-button--outlined foo-button"
          onClick={clickDeleteHandler}
          disabled={!appLoaded}
        >
          <div className="mdc-button__ripple"></div>
          <span className="mdc-button__label">delete 'A'</span>
        </button>
      </div>
      {position}
    </div>
  );
}
export default App;
