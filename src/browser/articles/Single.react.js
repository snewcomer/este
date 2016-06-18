import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import Article from'./Article.react';
import { connect } from 'react-redux';
import { incrementLikes } from '../../common/articles/actions';

export class Single extends Component {

  static PropTypes = {
    article: PropTypes.object.isRequired,
  };

  render() {
    const { id } = this.props.params;
    const articles = this.props.articles;
    const article = articles.find((article) => article._id === id)
    return(
      <div>
        <Article article={article} incrementLikes={this.props.incrementLikes} />
      </div>
    )
  }
}

export default connect(state => ({
  articles: state.articles.articles
}), {incrementLikes})(Single);
