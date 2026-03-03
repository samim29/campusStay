const express = require('express');
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createListing,
  getAllListings,
  getSingleListing,
  updateListing,
  deleteListing,
  getOwnerListings,
} = require("../controllers/listingController");


router.post("/", protect, authorizeRoles("owner"), createListing);
router.get("/", getAllListings);
router.get("/owner", protect, authorizeRoles("owner"), getOwnerListings);
router.get("/:id", getSingleListing);
router.put("/:id", protect, authorizeRoles("owner"), updateListing);
router.delete("/:id", protect, authorizeRoles("owner"), deleteListing);

module.exports = router;