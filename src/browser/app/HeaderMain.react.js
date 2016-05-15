import './HeaderMain.scss';
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
      <nav className="nav-main">
        <h1 className="header-title">
          <Link className="header-link" to="/">
            <FormattedMessage {...linksMessages.home} />
          </Link>
        </h1>
        <ul className="menu-items">
          {!viewer &&
            <li className="menu-item">
              <Link className="login" activeClassName="active" to="/login">
                <FormattedMessage {...linksMessages.login} />
              </Link>
            </li>
          }
        </ul>
      </nav>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}))(Header);
