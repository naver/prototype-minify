# prototype-minify [![npm package](https://img.shields.io/npm/v/prototype-minify.svg)](https://www.npmjs.com/package/prototype-minify)

Minify prototype for typescript or unminfited prototype.

```sh
$ npm i prototype-minify
```

|Before|After|
|:---:|:---:|
|![](./before.png)|![](./after.png)|

## Bundler Plugins
* [**prototype-minify-webpack-plugin**](https://www.npmjs.com/package/prototype-minify-webpack-plugin) : for webpack
* [**rollup-plugin-prototype-minify**](https://www.npmjs.com/package/rollup-plugin-prototype-minify) : for rollup

## How to use
```js
import PrototypeMinify from 'prototype-minify';


const {code, map} = PrototypeMinify(filename, code, isSourcemap);

```