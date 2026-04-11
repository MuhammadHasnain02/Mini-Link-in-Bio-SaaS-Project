import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    socials: {
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" }
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual property for fetching links associated with this profile
profileSchema.virtual("links", {
  ref: "Link",
  localField: "_id",
  foreignField: "profileId"
});

export default mongoose.model("Profile", profileSchema);
