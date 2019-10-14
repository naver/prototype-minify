/*
	Copyright (c) 2019 NAVER Corp.
  MIT License 
  https://github.com/naver/prototype-minify
*/
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
function insertProto(path, name) {
  // var __proto = Scene.prototype;
  path.insertAfter(t.variableDeclaration("var", [
    t.variableDeclarator( t.identifier("__proto"), t.memberExpression(t.identifier(name), t.identifier("prototype")))
  ]));
}
function changeAssignment(path, name) {
  // Scene.prototype.method = function () {}
  if(path.operator !== "=") {
    return false;
  }
  
  var left = path.left;
  var members = names(left);
  // Scene.prototype
  if (members[0] === name && members[1] === "prototype") {
    // Scene.prototype.method => __proto.method
    left.object = t.identifier("__proto");
    return true;
  }
  return false;
  
}
module.exports = function PrototypeMinify(filename, code, sourcemap) {
  var ast = parser.parse(code, {
    sourceType: "module",
    sourceFilename: filename,
  });

  traverse(ast, {
    FunctionDeclaration: function (path) {
      var name = path.node.id.name;
      var isProto = false;
      var body = path.parent.body;

      body && body.forEach(function (innerPath, i) {
        // if (innerPath.type === "ReturnStatement" && innerPath.argument.type === "SequenceExpression") {
        //   innerPath.argument.expressions.forEach(function (assignmentPath) {
        //     if (assignmentPath.type === "AssignmentExpression") {
        //       var assignment = changeAssignment(assignmentPath, name);
        //       if(assignment) {
        //         if (firstIndex === -1) {
        //           firstIndex = i;
        //         }
        //       }
        //     }
        //   });
        //   return;
        // }
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
          if (!isProto) {
            isProto = true;
          }
          expression.arguments[0] = t.identifier("__proto");
        }
        if (expression.type === "AssignmentExpression") {
          var assignment = changeAssignment(expression, name);
          if(assignment) {
            if (!isProto) {
              isProto = true;
            }
            return;
          }
        }
      });
      isProto && insertProto(path, name);
      path.skip();
      path.parentPath.skip();
    },
  });
  var output = generate(ast, {
    sourceFileName: filename,
    sourceMaps: sourcemap,
  }, code);

  return output;
}