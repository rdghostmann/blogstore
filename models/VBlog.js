import mongoose from "mongoose"

const VBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
  views: { type: String, required: true }, // Accept string for "15.2K" etc.
  likes: { type: String, required: false },
  publishedDate: { type: String, required: false },
  category: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: false }
  },
  embedUrl: { type: String }, // Optional, not in sample data
}, { timestamps: true })

const VBlog = mongoose.models.VBlog || mongoose.model("VBlog", VBlogSchema)
export default VBlog