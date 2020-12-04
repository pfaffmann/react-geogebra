import React from 'react';
import useScript from './useScript';

function Geogebra(props) {
  let { id, appletOnLoad } = props;
  if (!id) {
    id = 'ggb-applet';
  }

  function onLoad() {
    //Nachdem das Applet geladen ist wird dies ausgeführt
    console.log('onLoad triggered');
    appletOnLoad();
  }

  function loadGeogebraApp() {
    //console.log(id);
    const parameter = JSON.parse(JSON.stringify(props));
    parameter.appletOnLoad = onLoad;
    //console.log(parameter);
    const ggbApp = new window.GGBApplet(parameter, true);
    window.addEventListener('load', () => {
      ggbApp.inject(id);
    });
  }

  const geogebraUrl = 'https://geogebra.org/apps/deployggb.js';
  useScript(geogebraUrl, loadGeogebraApp);

  return <div id={id}></div>;
}

Geogebra.defaultProps = {
  appName: 'classic',
  width: 800,
  height: 600,
  showToolBar: false,
  showAlgebraInput: false,
  showMenuBar: false,
};

export default Geogebra;
