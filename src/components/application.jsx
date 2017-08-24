const React = require('react');
const PropTypes = require('prop-types');

/**
 * The name of the connect role.
 */
const CONNECT_ROLE = 'Application.Connect';

/**
 * The name of the workspace role.
 */
const WORKSPACE_ROLE = 'Application.Workspace';

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
    if (connectRoles === undefined) {
      this.raiseNotFound(CONNECT_ROLE);
    }
    if (workspaceRoles === undefined) {
      this.raiseNotFound(WORKSPACE_ROLE);
    }
    this.connectRole = connectRoles[0];
    this.workspaceRole = workspaceRoles[0]
  }

  /**
   * Raises a not found error when roles are missing for the key.
   *
   * @param {String} role - The missing role.
   */
  raiseNotFound(role) {
    throw new Error(`No roles found for '${role}'. Please ensure 1 is registered in the app registry.`);
  }

  /**
   * Render the Hadron application.
   *
   * @returns {React.Component} The component.
   */
  render() {
    if (this.props.isConnected) {
      return (<this.workspaceRole.component />);
    }
    return (<this.connectRole.component />);
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
