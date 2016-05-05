import './Page.scss';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage, FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';

const messages = defineMessages({
  title: {
    defaultMessage: 'Home',
    id: 'home.title'
  }
});

class Page extends Component {

  static propTypes = {
    children: PropTypes.object,
    intl: intlShape.isRequired
  };

  render() {
    const { children, intl } = this.props;
    const title = intl.formatMessage(messages.title);

    return (
      <div className="home-page">
        <Helmet title={title} />
        {children}
        {/* Use require for assets. It's super useful for CDN. */}
      </div>
    );
  }

}

export default injectIntl(Page);
