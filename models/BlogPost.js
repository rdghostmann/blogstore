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
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      "Movies",
      "Music",
      "TV Shows",
      "Film Industry",
      "Gaming",
      "Pop Culture"
    ],
    required: true
  },
  status: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
}, { timestamps: true })

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)
export default BlogPost