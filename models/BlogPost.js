import mongoose from "mongoose"

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false // Allow missing for demo/sample data
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: false }
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false // Allow missing for demo/sample data
  },
  category: {
    type: String,
    required: true
    // Remove enum for flexibility, or update enum to include all used categories
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "published"
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: false,
    unique: false
  },
  tags: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  commentsList: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  readTime: {
    type: String
  }
}, { timestamps: true })

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)
export default BlogPost



