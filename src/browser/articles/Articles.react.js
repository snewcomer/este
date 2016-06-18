import Component from 'react-pure-render/component';
import Article from './Article.react';
import { loadArticles, incrementLikes } from '../../common/articles/actions';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


export class Articles extends Component {

  static PropTypes = {
    loadArticles: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadArticles();
  }

  render() {
    const { articles } = this.props;
    const list = articles.toList().sortBy(item => item.createdAt).reverse();
    return (
      <div className="articles-container">
        {list.map(article =>
          <Article incrementLikes={this.props.incrementLikes} article={article} key={article._id} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { articles: state.articles.articles };
};

export default connect(mapStateToProps, { loadArticles, incrementLikes })(Articles);
