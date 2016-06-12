import './Article.scss';
import { Link } from 'react-router';
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
        <div className="flex-container">
          <button className="likes">&hearts; {article.likes}</button>
          <div className="comment-wrapper">
            <Link className="button" to={`/`}>
              <span className="comment-bubble"></span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
