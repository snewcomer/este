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
        <Link to={`dashboard/article/${article._id}`}>
          <h2 className="article-title">{article.title}</h2>
        </Link>
        <span className="article-createdAt">{article.createdAt}</span>
        <section className="article-body">
          <p>{article.body}</p>
        </section>
        <div className="flex-container">
          <button onClick={this.props.incrementLikes.bind(null, article._id)} className="likes">&hearts; {article.likes}</button>
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
