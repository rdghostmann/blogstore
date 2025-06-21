import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
  }, // Email field
  phoneNumber: {
    type: String,
  }, // Phone number field
  otp: {
    type: String,
    required: true,
  }, // OTP field (required)
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Automatically delete document after 10 minutes (600 seconds)
  }, // Creation timestamp with 10-minute expiry
});

// Ensure at least one of email or phoneNumber is provided
OtpSchema.pre("validate", function (next) {
  if (!this.email && !this.phoneNumber) {
    next(new Error("Either email or phone number is required"));
  } else {
    next();
  }
});

const Otp = mongoose.models?.Otp || mongoose.model("Otp", OtpSchema);
export default Otp;