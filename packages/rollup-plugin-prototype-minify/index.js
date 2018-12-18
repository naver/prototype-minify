var minify = require("prototype-minify");


module.exports = function PrototypeMinify(e) {
  var sourcemap = e.sourcemap;

  return {
    name: "prototype-minify",
    transform: function (code, id) {
      var output = minify(id, code, sourcemap);

      return {
        code: output.code,
        map: sourcemap ? output.map : {mappings: ""},
      };
    }
  }
};
