import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {

  static propTypes = {
    viewer: PropTypes.object
  };

  render() {
    const { viewer } = this.props;

    return (
      <header>
        <h1>
          <Link to="/">
            <FormattedMessage {...linksMessages.home} />
          </Link>
        </h1>
        <ul>
          {!viewer &&
            <li>
              <Link activeClassName="active" to="/login">
                <FormattedMessage {...linksMessages.login} />
              </Link>
            </li>
          }
        </ul>
      </header>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}))(Header);

