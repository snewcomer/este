import { Record } from 'immutable';

const Article = Record({
  createdAt: null,
  _id: '',
  body: '',
  title: '',
  author: '',
  hot: '',
  comments: [],
});

export default Article;

