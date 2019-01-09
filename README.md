# prototype-minify [![npm package](https://img.shields.io/npm/v/prototype-minify.svg)](https://www.npmjs.com/package/prototype-minify)

Minify prototype for typescript or unminfied prototype.

> https://github.com/Microsoft/TypeScript/issues/9638
>
> The links above suggest a number of suggestions to reduce **```prototype```**, but TypeScript does not seem to accept them for a variety of reasons.
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

## License

MIT License

```
Copyright (c) 2019 NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

