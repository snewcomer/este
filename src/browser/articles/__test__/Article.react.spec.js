import Article from '../Article.react.js';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';

describe('Article', () => {
  const articleDefaultProps = {
    article: { id: 1, title: 'It is an article', body: 'this body' },
    // toggleArticleCompleted: () => {},
  };

  it('should display body, title, createdAt dates', () => {
    // const spiesObject = { deleteArticle: () => {} };
    // const deleteArticleSpy = spy(spiesObject, 'deleteArticle');

    // Use the full dom rendering to test user interactions
    const wrapper = render(
      <Article
        {...{
          ...articleDefaultProps,
          // deleteArticle: spiesObject.deleteArticle,
        }}
      />
    );

    expect(wrapper.find('.article-title').length).to.equal(1);
    expect(wrapper.find('.article-title').text()).to.equal('It is an article');
    expect(wrapper.find('.article-body').length).to.equal(1);
    expect(wrapper.find('.article-body').text()).to.equal('this body');
    expect(wrapper.find('.article-createdAt').length).to.equal(1);

    // expect(Article.componentDidMount.calledOnce).to.equal(true);
    // expect(deleteArticleSpy.calledOnce).equal(true);
    // expect(deleteArticleSpy.firstCall.args[0]).equal(articleDefaultProps.article.id);
  });
});

