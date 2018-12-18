# prototype-minify-webpack-plugin [![npm package](https://img.shields.io/npm/v/prototype-minify-webpack-plugin.svg)](https://www.npmjs.com/package/prototype-minify-webpack-plugin)

Minify prototype for typescript or unminfited prototype.
```
$ npm i prototype-minify-webpack-plugin
```

|Before|After|
|:---:|:---:|
|![](./before.png)|![](./after.png)|

## How to use
```js
import PrototypeMinifyPlugin from 'prototype-minify-webpack-plugin';

{
  plugins: [
    new PrototypeMinifyPlugin(),
  ]
}

```