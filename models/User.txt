// User Model
import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },
    country: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "superAdmin", "admin", "editor"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    }, // For Magic Link verification
    verifyToken: {
      type: String,
    },
    verifyTokenExpire: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getVerificationToken = function () {
  // Generate the token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Hash the token
  this.verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

  return verificationToken;
};

// Fix the model export
const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
