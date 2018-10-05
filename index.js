var parser = require("@babel/parser");
var generate = require("@babel/generator").default;
var traverse = require("@babel/traverse").default;
var t = require("@babel/types");

function names(member) {
  var arr = [];

  if (member.object) {
    arr = arr.concat(names(member.object));
  }
  if (member.property) {
    arr = arr.concat(names(member.property));
  }
  if (member.name) {
    arr = arr.concat(member.name);
  }
  return arr;
}
function insertProto(body, i, name) {
  // var __proto = Scene.prototype;
  body.splice(i, 0, t.variableDeclaration("var", [
    t.variableDeclarator( t.identifier("__proto"), t.memberExpression(t.identifier(name), t.identifier("prototype")))
  ]));
}
module.exports = function PrototypeMinify(filename, code, sourcemap) {
  var ast = parser.parse(code, {
    sourceType: "module",
    sourceFilename: filename,
  });

  traverse(ast, {
    FunctionDeclaration: function (path) {
      var name = path.node.id.name;
      var isFirst = false;
      var body = path.parent.body;

      body && body.forEach(function (innerPath, i) {
        
        if (innerPath.type !== "ExpressionStatement") {
          return;
        }
        var expression = innerPath.expression;

        if (expression.type === "CallExpression") {
          // Object.defineProperty(Scene.prototype, {...});
          var members = names(expression.callee);

          if (members[0] !== "Object" || members[1] !== "defineProperty") {
            return;
          }
          var prototypeNames = names(expression.arguments[0]);
          if (prototypeNames.length !== 2 ||
            prototypeNames[0] !== name ||
            prototypeNames[1] !== "prototype") {
            return;
          }
          if (!isFirst) {
            insertProto(body, i, name);
            isFirst = true;
          }
          expression.arguments[0] = t.identifier("__proto");
        }
        // Scene.prototype.method = function () {}
        if(expression.type !== "AssignmentExpression" && expression.operator !== "=") {
          return;
        }
        var left = expression.left;
        var members = names(left);

        // Scene.prototype
        if (members[0] === name && members[1] === "prototype") {
          if (!isFirst) {
            insertProto(body, i, name);
            isFirst = true;
          }
          // Scene.prototype.method => __proto.method
          left.object = t.identifier("__proto");
        }
      });
      path.skip();
      path.parentPath.skip();
    },
  });
  var output = generate(ast, {sourceMaps: sourcemap}, code);

  return output
}