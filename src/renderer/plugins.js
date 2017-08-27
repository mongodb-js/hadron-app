const path = require('path');
const os = require('os');
const AppRegistry = require('hadron-app-registry');
const { PackageManager, Action } = require('hadron-package-manager');

/**
 * The src dir.
 */
const SRC = 'src';

/**
 * The internal plugins dir.
 */
const INTERNAL_PLUGINS = 'internal-packages';

/**
 * Initializes the plugin manager and the app registry.
 *
 * @param {String} root - The root of the application.
 * @param {Object} config - The distribution config.
 */
const initPlugins = (root, config) => {
  const internalPlugins = path.join(root, SRC, INTERNAL_PLUGINS);
  const developerPlugins = path.join(os.homedir(), config.pluginsDirectory);
  const appRegistry = new AppRegistry();
  const pluginManager = new PackageManager(
    [ internalPlugins, developerPlugins ],
    root,
    config.plugins
  );

  global.hadronApp.appRegistry = appRegistry;
  global.hadronApp.pluginManager = pluginManager;

  Action.packageActivationCompleted.listen(() => {
    global.hadronApp.appRegistry.onActivated();
  });

  pluginManager.activate(appRegistry);
};

module.exports = initPlugins;
