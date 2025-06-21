import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema(
  {
    user: String,
    avatar: String,
    rating: Number,
    date: String,
    comment: String,
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  sku: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: null },
  images: { type: [String], default: [] },
  image: { type: String }, // for backward compatibility
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 0 },
  description: { type: String },
  isNewArrival: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  features: { type: [String], default: [] },
  specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
  reviews: { type: [ReviewSchema], default: [] },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;