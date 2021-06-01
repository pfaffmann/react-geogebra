# React GeoGebra Component

Hi Everyone. Welcome to my first published package for [react.js](https://reactjs.org/).
I'm going to show you an easy way to embed [GeoGebra](https://www.geogebra.org/) Maths App to your React project.<br />
This is not an official GeoGebra-project.

[![NPM](https://nodei.co/npm/react-geogebra.png?compact=true)](https://nodei.co/npm/react-geogebra/)

## Demo

Try the demo: https://saunaaa.github.io/react-geogebra

## Installation

In order to start using react-geogebra ensure you install it inside your react project folder as shown below:

```
npm install react-geogebra
```

Now you can import the package:

```jsx
import Geogebra from 'react-geogebra';
```

## Basic usage

and use it in your application. For example:

```jsx
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

```jsx
<Geogebra id="app1" />
<Geogebra id="app2" />
```

## Props and Parameters

### Default Props

```jsx
Geogebra.defaultProps = {
  appName: 'classic',
  width: 800,
  height: 600,
  showToolBar: true,
  showAlgebraInput: true,
  showMenuBar: true,
};
```

### Added Props

```jsx
<Geogebra
  debug
  onReady={readyHandler}
  LoadComponent={() => <h1>Loading</h1>}
></Geogebra>
```

| Prop               | Type            | Description                                            |
| ------------------ | --------------- | ------------------------------------------------------ |
| debug              | boolean         | true: additional logs in console                       |
| reloadOnPropChange | boolean         | true: every prop change fires a rerender of the applet |
| onReady            | ()=>void        | is called after appletOnLoad                           |
| LoadComponent      | ()=>JSX.Element | is shown before the applet gets injected into the DOM  |

### GeoGebra Props

A list of the GeoGebra props is available at the [GeoGebra-website](https://wiki.geogebra.org/en/Reference:GeoGebra_App_Parameters).

## GeoGebra App API

To interact with the embedded GeoGebra app you can use the [GeoGebra-API](https://wiki.geogebra.org/en/Reference:GeoGebra_Apps_API).
A Basic example with one Button and one event listener is given in the 'examples' folder. U can take a look at it [here](https://saunaaa.github.io/react-geogebra).

### Geogebra App Object

To interact with the embedded GeoGebra app you use the _applet object_.
You can save the object in a variable as soon as the GeoGebra app is **completely loaded**.
Otherwise the _applet object_ will be undefined.
You can define a function and give a reference to the 'appletOnLoad' prop. This function is called as soon as the GeoGebra App is completely loaded.

```jsx
function afterAppIsLoaded(){
    //This function will be called after the GeoGebra App is completly loaded.
}
<Geogebra appletOnLoad={afterAppIsLoaded}>
```

The name of the _applet object_ depends on the 'id' prop of the `<Geogebra>` component.
If no 'id' prop is given, you can get the _applet object_ as shown below:

```jsx
const app = window.ggbApplet;
```

If an 'id' prop is given:

```jsx
<Geogebra id="app1" />
...
const app = window.app1;
```

### Multiple Geogebra App Objects

Multiple _applet objects_ can be stored in variables as shown below:

```jsx
<Geogebra id="app1" />
<Geogebra id="app2" />
...
const app1 = window.app1;
const app2 = window.app2;
```

### Evaluating GeoGebra commands

To bind a command (for example creating a Point at specific coordinates) to a button you can create an `onClickHandler`:

```jsx
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

Be sure to **not** call the `onClickHandler` before the GeoGebra App is loaded.

### Register Listeners

The GeoGebra App can call functions whenever an event occurs. To register event listeners you use the 'appletOnLoad' prop:

```jsx
  function onEvent() {
    const app = window.ggbApplet;
    console.log(`Position A: (${app.getXcoord('A')},${app.getYcoord('A')})`);
  }

  function registerGeogebraListener() {
    const app = window.ggbApplet;
    app.registerUpdateListener(onEvent); //for more information check the GeoGebra API
    console.log('Geogebra Listener registered');
  }
  ...
        <Geogebra
        appName="geometry"
        width="600"
        height="400"
        appletOnLoad={registerGeogebraListener}
      />
```

## Known Bugs

- hot reload doesn't work properly (create-react-app)
- "Object related" event listeners don't work

## License

Check out the GeoGebra license agreement on their webpage. <br>
https://www.geogebra.org/license

## Support Me?

just buy me a coffee ☕️ <br>
<a href="https://www.buymeacoffee.com/saunaaa" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

<hr>

The tutorial used to deploy and publish the package can be found [here](https://medium.com/dailyjs/building-a-react-component-with-webpack-publish-to-npm-deploy-to-github-guide-6927f60b3220). <br>
I hope you are going to enjoy **react-geogebra** in your projects 👩‍💻👨‍💻🧑‍💻.
