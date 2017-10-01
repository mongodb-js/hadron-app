const React = require('react');
const AppRegistry = require('hadron-app-registry');
const chai = require('chai');
const expect = chai.expect;
const chaiEnzyme = require('chai-enzyme');
const { shallow, mount } = require('enzyme');
const Application = require('../../lib/components/application');

chai.use(chaiEnzyme());

/* eslint react/no-multi-comp: 0 */
describe('<Application', () => {
  const Connect = () => {
    return (<div className="connect"></div>);
  };
  const Workspace = () => {
    return (<div className="workspace"></div>);
  };
  const Preferences = () => {
    return (<div className="preferences"></div>);
  };
  const FeatureTour = () => {
    return (<div className="feature-tour"></div>);
  };

  before(() => {
    global.hadronApp.appRegistry = new AppRegistry();
  });

  context('when no connect role is defined', () => {
    const component = () => {
      shallow(<Application />);
    };

    it('raises an exception', () => {
      expect(component).to.throw(Application.CONNECT_ROLE);
    });
  });

  context('when no workspace role is defined', () => {
    const component = () => {
      shallow(<Application />);
    };

    before(() => {
      global.hadronApp.appRegistry.registerRole(Application.CONNECT_ROLE, { component: Connect });
    });

    after(() => {
      global.hadronApp.appRegistry = new AppRegistry();
    });

    it('raises an exception', () => {
      expect(component).to.throw(Application.WORKSPACE_ROLE);
    });
  });

  context('when the roles are defined', () => {
    before(() => {
      global.hadronApp.appRegistry.registerRole(Application.CONNECT_ROLE, { component: Connect });
      global.hadronApp.appRegistry.registerRole(Application.WORKSPACE_ROLE, { component: Workspace });
      global.hadronApp.appRegistry.registerRole(Application.PREFERENCES_ROLE, { component: Preferences });
      global.hadronApp.appRegistry.registerRole(Application.FEATURE_TOUR_ROLE, { component: FeatureTour });
    });

    context('when isConnected is false', () => {
      let wrapper;
      before(() => {
        wrapper = mount(<Application />);
      });

      it('renders the preferences', () => {

      });

      it('renders the feature tour', () => {

      });

      it('renders the Application.Connect role component', () => {
        expect(wrapper.find('.connect')).to.be.present();
      });

      it('does not render the Application.Workspace component', () => {
        expect(wrapper.find('.workspace')).to.not.be.present();
      });
    });

    context('when isConnected is true', () => {
      let wrapper;
      before(() => {
        wrapper = mount(<Application isConnected />);
      });

      it('renders the Application.Workspace role component', () => {
        expect(wrapper.find('.workspace')).to.be.present();
      });

      it('does not render the Application.Connect component', () => {
        expect(wrapper.find('.connect')).to.not.be.present();
      });
    });
  });
});
