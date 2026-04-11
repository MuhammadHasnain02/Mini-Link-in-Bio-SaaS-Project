import mongoose from "mongoose";

// A straightforward regex to validate typical HTTP/HTTPS URLs
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const linkSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: [true, "Profile reference is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      match: [urlRegex, "Please provide a valid URL"],
    },
    clicks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // Mongoose will automatically handle createdAt and updatedAt
);

export default mongoose.model("Link", linkSchema);
