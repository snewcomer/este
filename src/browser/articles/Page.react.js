import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import MainArticle from './MainArticle.react';
import React, { PropTypes } from 'react';
import { injectIntl, defineMessages, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Articles',
    id: 'articles.page.title'
  },
});

class Page extends Component {
  static PropTypes = {
    intl: intlShape.isRequired,
  };

  render(){
    const { intl } = this.props;
    const title = intl.formatMessage(messages.title);
    return (
      <div className="articles-page">
        <Helmet title={title} />
        <MainArticle />
      </div>
    );
  }
}

export default injectIntl(Page);
