const { expect } = require('chai');
const app = require('../../../');
const initPlugins = require('../../../lib/renderer/plugins');

describe('plugins', () => {
  describe('#initPlugins', () => {
    const config = {
      'pluginsDirectory': '.mongodb/compass/plugins-test',
      'plugins': [ 'example-plugin' ]
    };

    before(() => {
      global.hadronApp = app;
      initPlugins(__dirname, config);
    });

    after(() => {
      global.hadronApp = undefined;
    });

    it('sets the global app registry', () => {
      expect(global.hadronApp.appRegistry).to.not.equal(undefined);
    });

    it('sets the global plugin manager', () => {
      expect(global.hadronApp.pluginManager).to.not.equal(undefined);
    });

    it('loads the plugins', () => {
      expect(global.hadronApp.pluginManager.plugins.length).to.equal(1);
    });

    it('activates the plugins', () => {
      expect(global.hadronApp.pluginManager.plugins[0].isActivated).to.equal(true);
    });
  });
});
