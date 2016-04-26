import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Article from './Article.react';
import { loadArticles } from '../../common/articles/actions';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Articles',
    id: 'articles.all.page.title'
  },
});

export class Articles extends Component {

  static PropTypes = {
    loadArticles: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadArticles();
  }

  render(){
    const { articles } = this.props;
    const list = articles.toList().sortBy(item => item.createdAt).reverse();
    return (
      <div className="articles-container">
        {list.map(article =>
          <Article article={article} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { articles: state.articles.articles };
};

export default connect(mapStateToProps, { loadArticles })(Articles);

