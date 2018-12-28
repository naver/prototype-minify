# prototype-minify [![npm package](https://img.shields.io/npm/v/prototype-minify.svg)](https://www.npmjs.com/package/prototype-minify)

Minify prototype for typescript or unminfited prototype.

> https://github.com/Microsoft/TypeScript/issues/9638
>
> The links above suggest a number of suggestions to reduce prototypes, but TypeScript does not seem to accept them for a variety of reasons.
>
> So we created a plug-in called **```prototype-minify```** to solve this problem.

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
