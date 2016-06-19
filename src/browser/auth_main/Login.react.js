import './Login.scss';
import Component from 'react-pure-render/component';
import LoginError from './LoginError.react';
import React, { PropTypes } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import { FormattedMessage, defineMessages } from 'react-intl';
import { browserHistory, locationShape } from 'react-router';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { focusInvalidField } from '../../common/lib/validation';
import { login } from '../../common/auth_main/actions';
import { Button } from 'react-bootstrap';

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: 'your@email.com',
    id: 'auth.login.emailPlaceholder'
  },
  formLegend: {
    defaultMessage: 'Classic XMLHttpRequest Login',
    id: 'auth.login.formLegend'
  },
  hint: {
    defaultMessage: 'Hint: pass1',
    id: 'auth.login.hint'
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'auth.login.passwordPlaceholder'
  }
});

export class Login extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    location: locationShape,
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const { login, fields } = this.props;
    try {
      await login(fields.$values());
    } catch (error) {
      focusInvalidField(this, error.reason);
      throw error;
    }
    browserHistory.push('/dashboard');
  }

  redirectAfterLogin() {
    const { location } = this.props;
    const nextPathname = location.state && location.state.nextPathname || '/';
    browserHistory.replace(nextPathname);
  }

  render() {
    const { auth, fields } = this.props;

    return (
      <div className="login">
        <form onSubmit={this.onFormSubmit}>
          <fieldset disabled={auth.formDisabled}>
            <fieldset className="form-group">
              <label>Email:</label>
              <FormattedMessage {...messages.emailPlaceholder}>
                {message => <input
                  {...fields.email}
                  maxLength="100"
                  className="form-control"
                  placeholder={message}
                />}
              </FormattedMessage>
            </fieldset>
            <br />
            <fieldset className="form-group">
              <label>Password:</label>
              <FormattedMessage {...messages.passwordPlaceholder}>
                {message => <input
                  {...fields.password}
                  maxLength="100"
                  className="form-control"
                type="password"
                  placeholder={message}
                />}
              </FormattedMessage>
            </fieldset>
            <br />
            <Button type="submit" bsStyle="info">
              <FormattedMessage {...buttonsMessages.login} />
            </Button>
            <LoginError error={auth.formError} />
          </fieldset>
        </form>
      </div>
    );
  }

}

Login = fields(Login, {
  path: 'auth',
  fields: ['email', 'password']
});

export default connect(state => ({
  auth: state.auth
}), { login })(Login);
