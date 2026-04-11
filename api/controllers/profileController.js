import Profile from "../models/Profile.js";

// POST /api/profile - Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { username, fullName, bio, profileImage, theme } = req.body;
    
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
      theme
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
