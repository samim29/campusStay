const express = require('express');
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createListing,
  getAllListings,
  getSingleListing,
} = require("../controllers/listingController");


router.post("/", protect, authorizeRoles("owner"), createListing);
router.get("/", getAllListings);
router.get("/:id", getSingleListing);

module.exports = router;