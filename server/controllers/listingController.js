const Listing = require("../models/Listing");

//create listings
const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      roomType,
      foodAvailable,
      distanceFromCollege,
      address,
      coordinates,
    } = req.body;

    const listing = await Listing.create({
      title,
      description,
      price,
      roomType,
      foodAvailable,
      distanceFromCollege,
      address,
      location: {
        type: "Point",
        coordinates,
      },
      owner: req.user._id,
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Listings
const getAllListings = async (req, res) => {
  try {
    const { minPrice, maxPrice, foodAvailable, roomType } = req.query;

    let filter = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (foodAvailable !== undefined) {
      filter.foodAvailable = foodAvailable === "true";
    }

    if (roomType) {
      filter.roomType = roomType;
    }

    const listings = await Listing.find(filter).populate("owner", "name email");

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Listing
const getSingleListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner", "name email");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Listing
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ownership check
    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Listing
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ownership check
    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await listing.deleteOne();

    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Owner's Listings
const getOwnerListings = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user._id });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {createListing,getAllListings,getSingleListing,updateListing,deleteListing,getOwnerListings};