import Link from "../models/Link.js";

// POST /api/links - Create a new link
export const createLink = async (req, res) => {
  try {
    const { profileId, title, url } = req.body;
    const newLink = await Link.create({ profileId, title, url });
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ message: "Error creating link", error: error.message });
  }
};

// GET /api/links/:profileId - Get all links (active and inactive) for a profile
export const getLinks = async (req, res) => {
  try {
    const { profileId } = req.params;
    const links = await Link.find({ profileId });
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: "Error fetching links", error: error.message });
  }
};

// PUT /api/links/:id - Update link title or URL
export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, url },
      { new: true, runValidators: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: "Error updating link", error: error.message });
  }
};

// PATCH /api/links/:id/toggle - Toggle link active status
export const toggleLink = async (req, res) => {
  try {
    const { id } = req.params;
    
    const link = await Link.findById(id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    link.isActive = !link.isActive;
    await link.save();

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: "Error toggling link status", error: error.message });
  }
};

// PATCH /api/links/:id/click - Increment link clicks
export const trackClick = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({ message: "Error tracking click", error: error.message });
  }
};

// DELETE /api/links/:id - Permanently delete link
export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedLink = await Link.findByIdAndDelete(id);
    if (!deletedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting link", error: error.message });
  }
};
