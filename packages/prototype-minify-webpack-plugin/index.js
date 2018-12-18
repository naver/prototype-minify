/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Daybrush @daybrush
*/
var PrototypeMinify = require("prototype-minify");
var WebpackSources = require("webpack-sources");

function changeSource(assets, filename) {
  var target = assets[filename];
  var sourceAndMap = target.sourceAndMap();
  var map = !!sourceAndMap.map;
  var changedSourceAndMap = PrototypeMinify(filename, target.source(), map);

  assets[filename] = map ? new WebpackSources.SourceMapSource(
    changedSourceAndMap.code,
    filename,
    changedSourceAndMap.map,
    sourceAndMap.code,
    sourceAndMap.map,
  ) : new WebpackSources.RawSource(changedSourceAndMap.code);
}
function changeModules(compilation, chunks) {
  chunks.forEach(function (chunk) {
    chunk.files.forEach(function (filename) {
      changeSource(compilation.assets, filename);
    });
  });
}
function PrototypeMinifyPlugin() {}

PrototypeMinifyPlugin.prototype.apply = function (compiler) {
  if (compiler.hooks) {
    var plugin = { name: 'PrototypeMinify' };

    compiler.hooks.compilation.tap(plugin, function (compilation) {
      compilation.hooks.optimizeChunkAssets.tapAsync(plugin, function (chunks, callback) {
        changeModules(compilation, chunks);
        callback();
      });
    });
  } else {
    compiler.plugin('complication', function (compilation) {
      compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
        changeModules(compilation, chunks);
        callback();
      });
    });
  }
};

module.exports = PrototypeMinifyPlugin;