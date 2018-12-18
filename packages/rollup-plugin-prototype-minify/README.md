# rollup-plugin-prototype-minify [![npm package](https://img.shields.io/npm/v/rollup-plugin-prototype-minify.svg)](https://www.npmjs.com/package/rollup-plugin-prototype-minify)

Minify prototype for typescript or unminfited prototype.

|Before|After|
|:---:|:---:|
|![](./before.png)|![](./after.png)|
```js
import PrototypeMinify from 'rollup-plugin-prototype-minify';

export default {
  plugins: [
    PrototypeMinify({sourcemap: true}),
  ],
}
```