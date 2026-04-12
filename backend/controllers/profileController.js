import Profile from "../models/Profile.js";
import streamifier from "streamifier";
import configureCloudinary from "../config/cloudinary.js";

// POST /api/profile - Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { username, fullName, bio, profileImage, theme, socials } = req.body;
    
    // Check if username is already taken
    const existingProfile = await Profile.findOne({ username });
    if (existingProfile) {
      return res.status(409).json({ message: "Username is already taken. Please choose another one." });
    }

    const newProfile = await Profile.create({
      username,
      fullName,
      bio,
      profileImage,
      theme,
      socials
    });

    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error: error.message });
  }
};

// GET /api/profile/:username - Fetch a public profile with active links
export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    
    // Fetch profile and populate active links only
    const profile = await Profile.findOne({ username }).populate({
      path: "links",
      match: { isActive: true }
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// PUT /api/profile/:username - Update an existing profile
export const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { fullName, bio, theme, profileImage, username: newUsername, socials } = req.body;

    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // If username is being changed, check for uniqueness
    if (newUsername && newUsername !== username) {
      const existingProfile = await Profile.findOne({ username: newUsername });
      if (existingProfile) {
        return res.status(409).json({ message: "Username is already taken. Please choose another one." });
      }
      profile.username = newUsername;
    }

    if (fullName) profile.fullName = fullName;
    if (bio !== undefined) profile.bio = bio;
    if (theme) profile.theme = theme;
    if (profileImage !== undefined) profile.profileImage = profileImage;
    if (socials) profile.socials = socials;

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

// POST /api/profile/:username/image - Upload profile image and update profile
export const uploadProfileImage = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await Profile.findOne({ username });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const cloudinary = configureCloudinary();

    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'Link_In_Bio_SaaS_profiles' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const uploadResult = await streamUpload(req);

    // Persist the secure url identically
    profile.profileImage = uploadResult.secure_url;
    await profile.save();

    res.status(200).json({ secure_url: uploadResult.secure_url, profile });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};
