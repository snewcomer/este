import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  id: String,
  title: String,
  body: String,
  author: String,
  hot: Boolean,
  likes: Number,
  comments: [{ body: String, date: Date }],
  count: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Article' collection in the MongoDB database
const Article = mongoose.model('Article', ArticleSchema);

export default Article;
