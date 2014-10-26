var webmake = require('webmake');
var path = require('path');
var createWebmakePreprocessor = function(args, config, logger, helper) {

  config = config || {};

  var log = logger.create('preprocessor.webmake');

  var defaultOptions = {
    bare: true,
    sourceMap: false
  };

  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.webmake$/, '.js');
  };

  return function(content, file, done) {
    console.log('File: ' + file + ' was webmaked.')
    
    webmake(file, { sourceMap: true, cache: true }, function (err, content) {
      if (err) {
        console.log(err)
        done(err, null);
      }

      done(null, content)
    });

  };
};

createWebmakePreprocessor.$inject = ['args', 'config.webmakePreprocessor', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:webmake': ['factory', createWebmakePreprocessor]
};
