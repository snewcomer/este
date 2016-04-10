import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Article from './Article.react';
// import * as todosActions from '../../common/todos/actions';
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
    todos: PropTypes.object.isRequired,
  };

  render(){
    const { articles } = this.props;
    const list = articles.toList().sortBy(item => item.createdAt).reverse();

    return (
      <ol className="articles">
        {list.map(article =>
          <Article 
            article={article} 
          />
        )}
      </ol>
    );
  }
}

const mapStateToProps = (state) => {
  return { articles: state.articles };
};

export default connect(mapStateToProps, null)(Articles);


