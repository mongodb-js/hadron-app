const path = require('path');
const fs = require('fs');
const os = require('os');
const StyleManager = require('hadron-style-manager');

/**
 * The style tag constant.
 */
const STYLE = 'style';

/**
 * The compiled sources directory.
 */
const COMPILED_SOURCES = '.compiled-sources';

/**
 * The less name.
 */
const LESS = 'less';

/**
 * Setup the styles.
 *
 * @param {String} root - The application root directory.
 * @param {Object} config - The application's distribution config.
 */
const initStyles = (root, config, done) => {
  /**
   * @note: This is the legacy way to load styles - stays for backwards
   *   compatibility until all packages are external.
   */
  if (process.env.NODE_ENV !== 'production') {
    const manager = new StyleManager(root, path.join(root, COMPILED_SOURCES, LESS));
    manager.use(document, path.join(root, config.stylesheet));

    /**
     * @note: This loads all the styles from all the packages in the current
     *   distribution. The styles must be in package-root/styles/index.less
     *   This is for dev only, note that we will need to address pre-building
     *   and loading the prebuilt styles for the Compass artifacts for better
     *   performance.
     */
    manager.load(document, root, config.packages);
  }

  const developerPackages = path.join(os.homedir(), config.pluginsDirectory);

  /**
   * For production we need to also look in the configured directory for local
   * developer plugins.
   */
  fs.readdir(developerPackages, (error, files) => {
    if (error) {
      done();
    } else {
      files.forEach((file) => {
        /**
         * @durran - Temporary for workshop - will fix in style manager after.
         */
        try {
          const styles = document.createElement(STYLE);
          const loc = path.join(developerPackages, file, 'lib', 'styles', 'index.css');
          styles.textContent = fs.readFileSync(loc, { encoding: 'utf8' });
          document.head.appendChild(styles);
        } catch (e) {
          // @todo: Durran
        }
      });
      done();
    }
  });
};

module.exports = initStyles;
