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
    const listings = await Listing.find().populate("owner", "name email");
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

module.exports = {createListing,getAllListings,getSingleListing};