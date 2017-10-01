const React = require('react');
const PropTypes = require('prop-types');
const { Route, Router } = require('react-router');
const { createMemoryHistory } = require('history');

/**
 * The name of the connect role.
 */
const CONNECT_ROLE = 'Application.Connect';

/**
 * The name of the workspace role.
 */
const WORKSPACE_ROLE = 'Application.Workspace';

/**
 * The name of the preferences role.
 */
const PREFERENCES_ROLE = 'Application.Preferences';

/**
 * The name of the feature tour role.
 */
const FEATURE_TOUR_ROLE = 'Application.FeatureTour';

/**
 * The application class name.
 */
const APPLICATION = 'application';

/**
 * The base Hadron application component, which controls rendering of the
 * workspace or connect role components.
 */
class Application extends React.Component {

  /**
   * Initialize the applicaiton.
   *
   * @param {Object} props - The properties.
   */
  constructor(props) {
    super(props);
    this.initialize();
  }

  /**
   * Initialize the application component, getting the role components.
   */
  initialize() {
    const connectRoles = global.hadronApp.appRegistry.getRole(CONNECT_ROLE);
    const workspaceRoles = global.hadronApp.appRegistry.getRole(WORKSPACE_ROLE);
    const preferencesRoles = global.hadronApp.appRegistry.getRole(PREFERENCES_ROLE);
    const featureTourRoles = global.hadronApp.appRegistry.getRole(FEATURE_TOUR_ROLE);
    if (connectRoles === undefined) {
      this.raiseNotFound(CONNECT_ROLE);
    }
    if (workspaceRoles === undefined) {
      this.raiseNotFound(WORKSPACE_ROLE);
    }
    this.connectRole = connectRoles[0];
    this.workspaceRole = workspaceRoles[0];
    this.preferencesRole = preferencesRoles ? preferencesRoles[0] : undefined;
    this.featureTourRole = featureTourRoles ? featureTourRoles[0] : undefined;
  }

  /**
   * Raises a not found error when roles are missing for the key.
   *
   * @param {String} role - The missing role.
   */
  raiseNotFound(role) {
    throw new Error(`No roles found for '${role}'. Please ensure 1 is registered in the app registry.`);
  }

  renderApplication() {
    if (this.props.isConnected) {
      return (<this.workspaceRole.component />);
    }
    return (<this.connectRole.component />);
  }

  renderFeatureTour() {
    return this.featureTourRole;
  }

  renderPreferences() {
    return this.preferencesRole;
  }

  /**
   * Renders the hadron application based on whether we are connected or not.
   *
   * @returns {React.Component} - The application component.
   */
  renderApplication() {
    if (this.props.isConnected) {
      return (<this.workspaceRole.component />);
    }
    return (<this.connectRole.component />);
  }

  /**
   * Render the Hadron application, setting up the react router and root path.
   *
   * @returns {React.Component} The component.
   */
  render() {
    return (
      <Router history={createMemoryHistory()}>
        <Route path="/" children={() => (
          <div className={APPLICATION}>
            {this.renderPreferences()}
            {this.renderFeatureTour()}
            {this.renderApplication()}
          </div>
        )}/>
      </Router>
    );
  }
}

Application.propTypes = {
  isConnected: PropTypes.bool.isRequired
};

Application.defaultProps = {
  isConnected: false
}

Application.displayName = 'Application';

module.exports = Application;
module.exports.CONNECT_ROLE = CONNECT_ROLE;
module.exports.WORKSPACE_ROLE = WORKSPACE_ROLE;
