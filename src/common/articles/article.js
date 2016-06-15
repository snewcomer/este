import { Record } from 'immutable';

const Article = Record({
  createdAt: null,
  _id: '',
  body: '',
  title: '',
  author: '',
  hot: '',
  likes: 0,
  comments: [],
});

export default Article;
