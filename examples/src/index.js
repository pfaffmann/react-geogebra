/***  examples/src/index.js ***/
import React from 'react';
import { render } from 'react-dom';
import GeoGebra from '../../src';
const App = () => <GeoGebra showToolBar showMenuBar showAlgebraInput />;
render(<App />, document.getElementById('root'));
