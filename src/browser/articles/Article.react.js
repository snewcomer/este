import './Article.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
// import { FormattedMessage, FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

export default class Article extends Component {

  static PropTypes = {
    article: PropTypes.object.isRequired,
  };

  render() {
    const { article } = this.props;
    return(
      <div className="article-single">
        <h2 className="article-title">{article.title}</h2>
        <span className="article-createdAt">{article.createdAt}</span>
        <section className="article-body">
          <p>{article.body}</p>
        </section>
      </div>
    )
  }
}
