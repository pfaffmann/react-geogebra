# React GeoGebra Component

Hi Everyone. Welcome to my first published package for [react.js](https://reactjs.org/).
I'm going to show you an easy way to embed [GeoGebra](https://www.geogebra.org/) Maths App to your React project.

## Demo

Try the demo: https://saunaaa.github.io/react-geogebra

## Installation

In order to start using react-geogebra ensure you install it inside your react project folder as shown below:

```
npm install react-geogebra
```

Now you can import the package:

```javascript
import Geogebra from 'react-geogebra';
```

## Basic usage

and use it in your application. For example:

```javascript
...
function App() {
  return (
    <Geogebra
      width="800"
      height="600"
      showMenuBar
      showToolBar
      showAlgebraInput
    />
  );
}
...
```

## Multiple GeoGebra instances

To render multiple GeoGebra instances it is necessary to give every instance an individual 'id' prop.

```javascript
<Geogebra id="app1" />
<Geogebra id="app2" />
```

## GeoGebra parameters

A list of all possible props is available at the [GeoGebra-Website](https://wiki.geogebra.org/en/Reference:GeoGebra_App_Parameters).

## GeoGebra App API

To interact with the embedded GeoGebra app you can use the [GeoGebra-API](https://wiki.geogebra.org/en/Reference:GeoGebra_Apps_API).
A Basic example with one Button and one event listener is given in the 'examples' folder. U can take a look at it [here](https://saunaaa.github.io/react-geogebra).

### Geogebra App Object

To interact with the embedded GeoGebra app you use the applet object.
You can save the object in a variable as soon as the GeoGebra app is **completely loaded**.
Otherwise the applet object will be undefined.
You can define a function and give a reference to the 'appletOnLoad' prop. This function is called as soon as the GeoGebra App is completely loaded.

```javascript
function afterAppIsLoaded(){
    //This function will be called after the GeoGebra App is completly loaded.
}
<Geogebra appletOnLoad={afterAppIsLoaded}>
```

The name of the applet object depends on the 'id' prop of the `<Geogebra>` component.
If no 'id' prop is given, you can get the applet object as shown below:

```javascript
const app = window.ggbApplet;
```

If an 'id' prop is given:

```javascript
<Geogebra id="app1" />
...
const app = window.app1;
```

### Multiple Geogebra App Objects

Multiple applet objects can be stored in variables as shown below:

```javascript
<Geogebra id="app1" />
<Geogebra id="app2" />
...
const app1 = window.app1;
const app2 = window.app2;
```

### Evaluating GeoGebra commands

To bind a command (for example creating a Point at specific coordinates) to a button you can create a onClick handler:

```javascript
function onClickHandler(){
    const xCoord = 0.4;
    const yCoord = -1;
    const app = window.ggbApplet;
    app.evalCommand(`A=(${xCoord},${yCoord})`);
    //Check the GeoGebra API to get more information about evalCommand
}
...
 <button type="button" onClick={onClickHandler}>
        Set 'A'
      </button>
```

Be sure to not call the `onClickHandler`before the GeoGebra App is loaded.

### Register Listeners

The GeoGebra App can call functions whenever an event occurs. To register event listeners you use the 'appletOnLoad' prop:

```javascript
  function onEvent() {
    const app = window.ggbApplet;
    console.log(`Position A: (${app.getXcoord('A')},${app.getYcoord('A')})`);
  }

  function registerGeogebraListener() {
    const app = window.ggbApplet;
    app.registerUpdateListener(positionA); //for more information check the GeoGebra API
    console.log('Geogebra Listener registered');
  }
  ...
        <Geogebra
        appName="geometry"
        width="600"
        height="400"
        appletOnLoad={registerGeogebraListener}
        enableCAS="false"
      />
```

I hope you enjoy using react-geogebra in your projects 👩‍💻👨‍💻🧑‍💻.
