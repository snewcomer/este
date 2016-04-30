import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { FormattedMessage, FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

export default class Article extends Component {

  static PropTypes = {
    article: PropTypes.object.isRequired,
  };

  render() {
    const { article } = this.props;
    return(
      <div className="article-single">
        <span className="article-createdAt">{article.createdAt}</span>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-body">{article.body}</p>
      </div>
    )
  }
}
