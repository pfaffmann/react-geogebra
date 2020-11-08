# React GeoGebra Component

Hi Everyone. Welcome to my first published package for [react.js](https://reactjs.org/).
I'm going to show you an easy way to embed [Geogebra](https://www.geogebra.org/) Math App to your React project.

## Installation

In order to start using react-geogebra ensure you install it inside your react project folder as below:

```
npm install react-geogebra
```

Now you can import the package as shown below:

```javascript
import Geogebra from 'react-geogebra';
```

## Basic usage

and use it in your application. For example:

```javascript
...
function App(){
    return <GeoGebra/>
}
...
```

## Multiple GeoGebra instances

To render multiple GeoGebra instances it is necessary to give them an individual id prop.

```javascript
<Geogebra id="app1"/>
<Geogebra id="app2"/>
```

## GeoGebra parameters

A list of all possible props is available at the [GeoGebra-Website](https://wiki.geogebra.org/en/Reference:GeoGebra_App_Parameters).

## GeoGebra App API

https://wiki.geogebra.org/en/Reference:GeoGebra_Apps_API
