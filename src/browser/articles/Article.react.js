import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { FormattedMessage, FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

class Article extends Component {

  static PropTypes = {
    articles: PropTypes.object.isRequired,
  };

  render() {
    const { article } = this.props;
    return(
      <h2>{article.name}</h2>
    )
  }
}

export default injectIntl(Article);

