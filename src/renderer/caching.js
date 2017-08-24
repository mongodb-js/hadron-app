const ModuleCache = require('hadron-module-cache');
const CompileCache = require('hadron-compile-cache');

/**
 * Initialize the module cache and the compile cache.
 *
 * @param {String} root - The root application directory.
 * @param {Object} config - The application's distribution config.
 */
const initCaches = (root, config) => {
  ModuleCache.register(root);
  ModuleCache.add(root);
  CompileCache.setHomeDirectory(root);
  CompileCache.digestMappings = config._compileCacheMappings || {};
};

module.exports = initCaches;
