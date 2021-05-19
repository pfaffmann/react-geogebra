import React, { useEffect, useState, useRef } from 'react';

const loadScript = (url, id) =>
  new Promise((resolve, reject) => {
    let ready = false;
    if (!document) {
      reject(new Error('Document was not defined'));
    }

    const tag = document.getElementsByTagName('script')[0];
    const script = document.createElement('script');

    script.crossOrigin = '';
    script.id = `${id}-script`;
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = () => {
      if (!ready) {
        ready = true;
        resolve(script);
      }
    };
    script.onload = script.onreadystatechange;

    script.onerror = (msg) => {
      reject(new Error('Error loading script.'));
    };

    script.onabort = (msg) => {
      reject(new Error('Script loading aborted.'));
    };

    if (tag.parentNode != null) {
      //tag.parentNode.insertBefore(script, tag);
      tag.parentNode.insertBefore(script, tag);
    }
  });

const removeScript = (id) => {
  new Promise((resolve, reject) => {
    const script = document.getElementById(`${id}-script`);
    if (script) {
      script.remove();
      resolve();
    } else {
      reject(new Error('Error removing script.'));
    }
  });
};

const Geogebra = (props) => {
  const refProps = useRef(props);

  let { id, LoadComponent, onReady, appletOnLoad, debug } = refProps.current;
  if (!id) {
    id = 'ggb-applet';
  }
  if (!debug) {
    debug = false;
  }
  //If a JSX Component is not given as a prop, use h3 with children
  if (!LoadComponent) {
    LoadComponent = ({ children }) => <h3>{children}</h3>;
  }

  const url = 'https://geogebra.org/apps/deployggb.js';
  const [deployggbLoaded, setDeployggbLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [watchPropsChange, setWatchPropsChange] = useState(false);
  //gets called by GeoGebra after the Applet is ready
  const onAppletReady = () => {
    if (appletOnLoad) appletOnLoad();
    if (onReady) onReady();
    debug && console.log(`Applet with id "${id}" is ready`);
  };

  useEffect(() => {
    !deployggbLoaded &&
      loadScript(url, id)
        .then((script) => {
          debug &&
            console.log(`script from "${url}" succesfull loaded into the DOM`);
          setDeployggbLoaded(true);
        })
        .catch((err) => console.error(err));

    return () => {
      setDeployggbLoaded(false);
      //removeScript(id);
      const tag = document.getElementById(`${id}-holder`);
      if (tag) {
        tag.lastChild.textContent = '';
      }
    };
  }, []);

  useEffect(() => {
    const propsChanged = Object.keys(props).map((key) => {
      console.log(
        refProps.current[key] !== props[key],
        refProps.current[key],
        props[key]
      );
      if (
        typeof refProps.current[key] === 'function' &&
        typeof props[key] === 'function'
      )
        return false;
      if (
        typeof refProps.current[key] === 'object' &&
        typeof props[key] === 'object'
      )
        return false;
      return refProps.current[key] !== props[key];
    });
    if (propsChanged.some((element) => element === true)) {
      refProps.current = props;
      setWatchPropsChange(true);
    }
  }, [props]);

  useEffect(() => {
    if (window.GGBApplet) {
      const parameter = JSON.parse(JSON.stringify(refProps.current));
      parameter.appletOnLoad = onAppletReady;
      const ggbApp = new window.GGBApplet(parameter, true);
      ggbApp.inject(id);
      setLoading(false);
      setWatchPropsChange(false);
      debug &&
        console.log(`applet with id "${id}" succesfull injected into the DOM`);
    }
    return () => {
      const tag = document.getElementById(`${id}-holder`);
      if (tag) {
        tag.lastChild.textContent = '';
      }
    };
  }, [deployggbLoaded, watchPropsChange]);

  return (
    <div id={`${id}-holder`}>
      {loading && <LoadComponent>Loading</LoadComponent>}
      <div id={id}></div>
    </div>
  );
};

Geogebra.defaultProps = {
  appName: 'classic',
  width: 800,
  height: 600,
  showToolBar: true,
  showAlgebraInput: true,
  showMenuBar: true,
};

export default Geogebra;
