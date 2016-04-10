import { expect } from 'chai';
import utils from './utils';
import should from 'should';
import Article from '../article';

describe('Articles: models', () => {
  describe('#create', () => {
    it('should create a new Article', (done) => {
      const created = new Date();
      const body = 'A long movie is a horrible thing to watch' ;
      const author = 'Stephan Wat';
      const comments = [{ body: 'wat', date: created }];
      const u = {
        body: body, 
        title: 'A long movie', 
        author: author, 
        comments: comments, 
        createdAt: created,
      };
      Article.create(u, (err, createdArticle) => {
        should.not.exist(err);
        expect(createdArticle.title).to.equal('A long movie');
        expect(createdArticle.body).to.equal(body);
        expect(createdArticle.author).to.equal(author);
        expect(createdArticle.comments[0]['body']).to.eql('wat');
        expect(createdArticle.comments[0]['date']).to.eql(created);
        expect(createdArticle.createdAt).to.equal(created);
        done();
      });
    });
  });
});
