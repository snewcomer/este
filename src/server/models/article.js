import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  author: String,
  body: String,
  createdAt: { type: Date, default: Date.now }
});

const ArticleSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  hot: Boolean,
  likes: Number,
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Article' collection in the MongoDB database
const Article = mongoose.model('Article', ArticleSchema);

export default Article;
