import './MainArticle.scss';
import Component from 'react-pure-render/component';
import Article from './Article.react';
import { loadMainArticle, incrementLikes } from '../../common/articles/actions';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Featured Article',
    id: 'articles.main.page.title'
  },
});

export class MainArticle extends Component {
  componentDidMount() {
    this.props.loadMainArticle();
  }
  render() {
    const { article } = this.props;
    let mainArticle;
    if (article) {
      mainArticle = <Article incrementLikes={this.props.incrementLikes} article={article} key={article._id} />
    }
    return (
      <div className="articles-main-page">
        {mainArticle}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { article: state.articles.mainArticle };
};

export default connect(mapStateToProps, { loadMainArticle, incrementLikes })(MainArticle);
