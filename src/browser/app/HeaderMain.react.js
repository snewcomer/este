import './HeaderMain.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import Logout from '../auth_main/Logout.react';
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
          <li className="menu-item">
            <Link activeClassName="active" to="/dashboard/articles/new">
              <FormattedMessage {...linksMessages.newArticle} />
            </Link>
          </li>
          {!viewer &&
            <li className="menu-item">
              <Link className="login" activeClassName="active" to="/dashboard/login">
                <FormattedMessage {...linksMessages.login} />
              </Link>
            </li>
          }
          {viewer &&
            <li className="menu-item">
              <Logout />
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
