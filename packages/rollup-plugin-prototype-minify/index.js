/*
	Copyright (c) 2019 NAVER Corp.
  MIT License 
  https://github.com/naver/prototype-minify
*/
var minify = require("prototype-minify");

module.exports = function PrototypeMinify(e) {
  var sourcemap = e.sourcemap;
  var exclude = e.exclude || /node_modules/g;

  return {
    name: "prototype-minify",
    transform: function (code, id) {
      if (id.match(exclude)) {
        return {
            code,
            map: {mappings: ""},
        };
      }
 
      var output = minify(id, code, sourcemap);

      return {
        code: output.code,
        map: sourcemap ? output.map : {mappings: ""},
      };
    }
  }
};
