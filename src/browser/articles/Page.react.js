import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import { Articles } from './Articles.react';
import React, { PropTypes } from 'react'; 
import { FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Articles',
    id: 'articles.page.title'
  },
});

class Page extends Component {
  static PropTypes = {
    children: PropTypes.object,
    intl: intlShape.isRequired,
  };

  render(){
    const { children, intl } = this.props;
    const title = intl.formatMessage(messages.title);
    return (
      <div className="articles-page">
      <Helmet title={title} />
      <Articles />
      {children}
      </div>

    )
  }
}

export default injectIntl(Page);
