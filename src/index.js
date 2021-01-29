import React, { useEffect, useState } from 'react';
import useScript from './useScript';

const storage = sessionStorage;

function Geogebra(props) {
  let { id, appletOnLoad } = props;
  if (!id) {
    id = 'ggb-applet';
  }

  const [state, setState] = useState(null);
  const [applet, setApplet] = useState(null);

  useEffect(() => {
    const storedBase = storage.getItem(id);
    if (storedBase) {
      applet && applet.setBase64(storedBase);
    }
  }, [applet]);

  function onLoad() {
    //Nachdem das Applet geladen ist wird dies ausgeführt
    //console.log('onLoad triggered');

    // Hier UpdateCheckern
    //console.log(window[id]); //applet Object
    setApplet(window[id]);
    const app = window[id];
    app.registerUpdateListener(() => {
      app.getBase64((base) => {
        setState(base);
        try {
          storage.setItem(id, base);
        } catch (error) {
          console.error(error.message);
        }
      });
    });

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
