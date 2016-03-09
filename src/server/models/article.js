import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  id: String,
  text: String,
  count: { type: Number, min: 0 },
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Article' collection in the MongoDB database
const Article = mongoose.model('Article', ArticleSchema);

export default Article;
